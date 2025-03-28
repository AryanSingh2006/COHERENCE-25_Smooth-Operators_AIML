exports.uploadResume = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      size: file.size,
    }));

    res.status(200).json({
      message: 'Resume(s) uploaded successfully!',
      files: uploadedFiles
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: error.message });
  }
};
