const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');

async function parsePDF(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);

        console.log("Extracted Text:", data.text);

        // Extract structured data
        const extractedData = {
            name: extractName(data.text),
            email: extractEmail(data.text),
            skills: extractSkills(data.text),
            experience: extractExperience(data.text),
        };

        console.log("Extracted Data:", extractedData);

        // Store extracted data in FastAPI (JSON)
        await axios.post('http://127.0.0.1:8000/store_resume/', extractedData);

        return extractedData;
    } catch (error) {
        console.error("Error parsing PDF:", error.message);
        throw error;
    }
}

// Helper functions for data extraction (Add logic based on your requirements)
function extractName(text) {
    const nameRegex = /(?:Name[:\s]+)([A-Za-z\s]+)/i;
    const match = text.match(nameRegex);
    return match ? match[1].trim() : "Unknown";
}

function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : "Not Found";
}

function extractSkills(text) {
    const skillsList = ["Python", "JavaScript", "Machine Learning", "NLP", "SQL", "React", "Node.js"];
    return skillsList.filter(skill => text.includes(skill));
}

function extractExperience(text) {
    const expRegex = /(\d+)\+?\s*(?:years|yrs|Yrs|Years) of experience/i;
    const match = text.match(expRegex);
    return match ? parseInt(match[1]) : 0;
}

module.exports = parsePDF;
