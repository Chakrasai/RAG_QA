import fitz # type: ignore

def parse_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text() # type: ignore
    doc.close()
    return text


def parse_pdf_from_path(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text() # type: ignore
    doc.close()
    return text

print(parse_pdf_from_path(r"C:\Users\chakr\Downloads\Fullstack Internship Assignment.pdf"))
