const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload resume and process it
exports.uploadResume = async (req, res) => {
    try {
        const resumePath = req.file.path;

        // Read resume text (assuming it's a TXT or PDF)
        const resumeText = fs.readFileSync(resumePath, "utf8");

        // Convert resume text to input format for ML model
        const inputData = processTextToVector(resumeText);

        // Get prediction from the ML model
        const prediction = await predict(inputData);

        res.json({ prediction });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Error processing resume" });
    }
};

// Function to process text to vector (dummy example)
function processTextToVector(text) {
    return text.split(" ").map(word => word.length).slice(0, 100);  // Example: word lengths as features
}
