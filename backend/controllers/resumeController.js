const path = require("path");
const parsePDF = require("../services/pdfParser");

async function extractResumeData(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const text = await parsePDF(filePath);

    // Extract key details (Regex-based for now)
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = text.match(emailRegex);
    const email = emailMatch ? emailMatch[0] : "Not found";

    res.status(200).json({
      message: "Resume processed successfully",
      extractedData: { email, text },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { extractResumeData };
