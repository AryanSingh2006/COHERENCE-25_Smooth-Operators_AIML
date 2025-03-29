const express = require("express");
const multer = require("../config/multerConfig");
const { extractResumeData } = require("../controllers/resumeController");

const router = express.Router();

router.post("/upload", multer.single("resume"), extractResumeData);

module.exports = router;
