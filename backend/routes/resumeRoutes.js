const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(("/upload", upload.single("resume"), resumeController.uploadResume),()=>{
  console.log('resume uploaded')
});

module.exports = router;
