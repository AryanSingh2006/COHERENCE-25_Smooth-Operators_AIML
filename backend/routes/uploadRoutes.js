const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { uploadAndExtractText } = require("../controllers/uploadController");

// Upload PDF and extract text
router.post("/upload", upload.single("resume"), uploadAndExtractText);

module.exports = router;
