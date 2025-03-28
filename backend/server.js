require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('./config/multerConfig');

const app = express();

// Serve Uploaded Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple HTML Form to Upload Files
app.get('/', (req, res) => {
  res.send(`
    <h1>Upload Your Resume (PDF Only)</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="resume" multiple accept=".pdf" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Upload Route (Max 2 Files)
app.post('/upload', multer.array('resume', 2), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  res.status(200).json({
    message: 'Resume(s) uploaded successfully!',
    files: req.files
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
