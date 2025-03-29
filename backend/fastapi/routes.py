from fastapi import APIRouter, UploadFile, File
import pdfplumber
import json

router = APIRouter()

# ✅ Function to extract text from PDFs
def extract_text_from_pdf(pdf_file):
    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# ✅ Function to extract key details and calculate score
def extract_key_details(text):
    # Dummy extraction (Replace with actual NLP)
    details = {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "skills": ["Python", "Machine Learning", "NLP"],
        "years_of_experience": 3
    }
    
    # ✅ Calculate score (Basic logic: More skills & experience = Higher score)
    score = min(100, (len(details["skills"]) * 20) + (details["years_of_experience"] * 10))
    
    # ✅ Shortlist condition
    details["score"] = score
    details["shortlisted"] = score >= 90

    return details

# ✅ Resume Processing Endpoint
@router.post("/process-resume")
async def process_resume(file: UploadFile = File(...)):
    try:
        # Read text from PDF
        text = extract_text_from_pdf(file.file)
        
        # Extract details & calculate score
        extracted_data = extract_key_details(text)

        # ✅ Print extracted details in terminal
        print(json.dumps(extracted_data, indent=2))

        return {"message": "Resume processed successfully!", "data": extracted_data}
    except Exception as e:
        return {"error": str(e)}
