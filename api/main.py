import os
from fastapi import FastAPI, UploadFile, Form, File # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from dotenv import load_dotenv # type: ignore
from langchain.chat_models import ChatOpenAI # type: ignore
from langchain_community.chat_models import ChatOpenAI # type: ignore
from langchain.chains.question_answering import load_qa_chain # type: ignore
from langchain.docstore.document import Document # type: ignore
import fitz  # type: ignore
import time

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_BASE = os.getenv("OPENROUTER_API_BASE")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

answers = []

def cleanup_answers():
    # Remove answers older than 10 minutes (600 seconds)
    cutoff = time.time() - 600
    global answers
    answers = [a for a in answers if a.get("timestamp", 0) >= cutoff]

def add_answer(question, answer):
    cleanup_answers()
    answers.insert(0, {
        "question": question,
        "answer": answer,
        "timestamp": time.time()
    })


def extract_text_pdf(file_bytes: bytes):
    try:
        text = ""
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            for page in doc:
                text += page.get_text() # type: ignore
        return text
    except Exception as e:
        raise ValueError(f"PDF extraction failed: {e}")



def generate_answer(question: str, context: str):
    docs = [Document(page_content=context)]
    llm = ChatOpenAI(
        temperature=0,
        model="mistralai/mistral-7b-instruct",
        openai_api_key=os.getenv("OPENROUTER_API_KEY"),
        openai_api_base=os.getenv("OPENROUTER_API_BASE")
    )  # type: ignore
    chain = load_qa_chain(llm, chain_type="stuff")
    result = chain.run(input_documents=docs, question=question)
    return result


@app.post('/upload')
async def upload_file(file: UploadFile = File(...), text: str = Form(...)):
    try:
        content = await file.read()
        print(len(content), content[:20])
        extracted_text = extract_text_pdf(content)

        question = text.strip()

        generated_answer = generate_answer(question=question, context=extracted_text)

        add_answer(question, generated_answer)

        return {
            "message": "File uploaded and processed successfully",
            "question": question,
            "answer": generated_answer
        }

    except Exception as e:
        return {"error": str(e)}


@app.get('/answers')
async def ans():
    try:
        return {"answers": answers}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn # type: ignore
    uvicorn.run(app, host="127.0.0.1", port=8000)