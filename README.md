# 🧠 DocuBot – AI-Powered Document Q&A Assistant

**DocuBot** is an AI-powered web app that enables you to upload documents (PDF, Word) and instantly ask questions about their content. Leveraging **FastAPI**, **LangChain**, and **OpenRouter's LLM APIs**, DocuBot extracts text and delivers accurate, context-aware answers in real time.

---

## ✨ Features

- 📤 Upload `.pdf`, `.doc`, `.docx` files
- ❓ Ask questions about your uploaded documents
- 🤖 Get intelligent, LLM-powered answers
- 🔄 Ask multiple questions per document
- 🧠 Per-user in-memory session storage
- 🖼️ Modern, responsive UI with **React + TailwindCSS**
- 🌐 CORS-enabled backend for seamless frontend integration

---

## 🧱 Tech Stack

| Layer     | Technology                                 |
|-----------|--------------------------------------------|
| Frontend  | React (Vite), TailwindCSS, Axios           |
| Backend   | FastAPI, LangChain, PyMuPDF (fitz)         |
| LLM API   | OpenRouter API (e.g., Mistral-7B-Instruct) |

---

## 🗂️ Project Structure

```
root/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api.py
│   │   ├── document_utils.py
│   │   └── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── README.md
└── .gitignore
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js (v16+)
- Python (v3.10+)
- Git

---

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/Chakrasai/RAG_QA.git
```

### 🔨 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🛠️ 3. Start the Backend

```bash
cd ../backend/app
pip install -r requirements.txt
python main.py
```

#### 📁 Configure Environment Variables

Create a `.env` file inside `backend/`:

```
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_API_BASE=https://openrouter.ai/api/v1
```

#### ▶️ Run the Backend Server

```bash
uvicorn main:app --reload --port 8000
```

---

## 🚀 Future Improvements

- Persistent DB storage (PostgreSQL or MongoDB)
- User login and authentication
- Chat history for each user
- Support for `.txt`, `.xlsx`, `.pptx` files
- Voice-based question support (via Web Speech API)

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Contact / Contributions

**Developer:** CHAKRASAI AKUTHOTA  
**GitHub:**  https://github.com/Chakrasai
**Email:** chakrasaiaku@gmail.com



## 🛠️ API Documentation

### 📤 `POST /upload`

Uploads a document and a question, processes them using LangChain and OpenRouter, and returns an AI-generated answer. Each Q&A pair is stored in an in-memory list for 10 minutes.

**Request**

- **Method:** `POST`
- **Content-Type:** `multipart/form-data`

**Form Fields:**

| Field | Type        | Required | Description                        |
|-------|-------------|----------|------------------------------------|
| file  | UploadFile  | ✅       | Document file (`.pdf`, `.doc`, `.docx`) |
| text  | string      | ✅       | User's question about the document |

**Example Request (using Postman or frontend):**
```http
POST /upload
Content-Type: multipart/form-data

file: resume.pdf
text: What should I improve in this resume?
```

**Response (JSON):**
```json
{
    "message": "File uploaded and processed successfully",
    "question": "What should I improve in this resume?",
    "answer": "1. Add a summary at the top.\n2. Highlight key achievements..."
}
```

**Error Responses:**
- `"error": "PDF extraction failed: ..."` – if the file can't be read
- `"error": "..."` – general exception with error message

---

### 📥 `GET /answers`

Retrieves a list of all Q&A pairs submitted in the last 10 minutes (temporary in-memory storage).

**Request**

- **Method:** `GET`
- **URL:** `/answers`

**Example Request:**
```http
GET /answers
```

**Response (JSON):**
```json
{
    "answers": [
        {
            "question": "What should I improve in this resume?",
            "answer": "Add a summary section at the top...",
            "timestamp": 1718967356.30576
        },
        {
            "question": "How to highlight projects?",
            "answer": "Use bullet points and quantify impact.",
            "timestamp": 1718967415.10578
        }
    ]
}
```
> Only entries from the last 10 minutes are returned. Older entries are automatically discarded from memory.

# Architecture

                        ┌────────────────────────────┐
                        │       React Frontend       │
                        │                            │
                        │ - Upload PDF               │
                        │ - Enter Question           │
                        │ - Show AI Answer           │
                        └──────────┬─────────────────┘
                                   │
                          HTTP (POST /upload)
                          HTTP (GET /answers)
                                   │
                        ┌──────────▼────────────┐
                        │      FastAPI Backend   │
                        │                        │
                        │  /upload (POST)        │
                        │    → read PDF          │
                        │    → extract text      │
                        │    → generate answer   │
                        │    → store in memory   │
                        │                        │
                        │  /answers (GET)        │
                        │    → return recent Q&A │
                        └──────────┬─────────────┘
                                   │
                           🧠 LangChain Chain
                           (QuestionAnswering)
                                   │
                        ┌──────────▼────────────┐
                        │   OpenRouter API       │
                        │   (e.g., Mistral 7B)    │
                        └────────────────────────┘

```

Make sure the image file exists at the specified path.



Feel free to fork, star, and contribute!
