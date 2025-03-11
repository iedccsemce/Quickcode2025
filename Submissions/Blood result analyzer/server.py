import os
import webbrowser
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import groq
import fitz  # PyMuPDF for PDF reading
from docx import Document  # For DOCX reading

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")  # Serve files from the same directory
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

# Load Groq API key from environment variable
groq_api_key = os.getenv("GROQ_API_KEY")

if not groq_api_key:
    raise ValueError("⚠️ Groq API key is missing! Check your .env file.")

groq_client = groq.Groq(api_key=groq_api_key)

# Serve index.html
@app.route("/")
def serve_index():
    return send_from_directory(".", "index.html")

def extract_text_from_pdf(pdf_file):
    """Extracts text from a PDF file."""
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text = "".join(page.get_text() for page in doc)
    return text.strip()

def extract_text_from_docx(docx_file):
    """Extracts text from a DOCX file."""
    doc = Document(docx_file)
    return "\n".join([para.text for para in doc.paragraphs]).strip()

@app.route("/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"summary": "No file uploaded."})

    file = request.files["file"]
    
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file)
    elif file.filename.endswith(".docx"):
        text = extract_text_from_docx(file)
    else:
        try:
            text = file.read().decode("utf-8")  # Handle TXT files
        except UnicodeDecodeError:
            return jsonify({"summary": "Could not read file content."})
    
    if not text:
        return jsonify({"summary": "Could not extract text from the file."})
    
    try:
        response = groq_client.chat.completions.create(
            model="mixtral-8x7b-32768",  # Update to the relevant Groq model
            messages=[
                {"role": "system", "content": "Summarize this blood report in very simple language. Explain it as if talking to a non-medical person, avoiding complex medical terms. Add required indentation and say a simple explanation for each medical term, make it very short. Make it in bullet points form. Everything that is normal should be in a single bullet point, try to be as simple and concise as possible. Do not start with any pleasantry text; get to the point right away. If it's not a blood report just say invalid, also if any specifcally interesting info is provided explain its implications"},
                {"role": "user", "content": text}
            ]
        )
        summary = response.choices[0].message.content
    except Exception as e:
        return jsonify({"summary": f"Error processing request: {str(e)}"})
    
    return jsonify({"summary": summary, "tips": "If you need a more detailed explanation, try consulting a doctor or using medical reference websites."})

if __name__ == "__main__":
    port = 5000
    url = f"http://127.0.0.1:{port}/"

    if not os.environ.get("WERKZEUG_RUN_MAIN"):  # Ensures it runs only once
        webbrowser.open(url)

    app.run(debug=True, port=port)
