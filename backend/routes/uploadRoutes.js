const express = require('express'); 
const router = express.Router();
const upload = require('../config/multerConfig');
const { uploadResume } = require('../controllers/uploadController');

// Upload Route - Max 2 Files
router.post('/', upload.array('resume', 2), uploadResume);

module.exports = router;