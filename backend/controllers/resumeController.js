exports.uploadResume = (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    res.status(200).json({
      message: 'Resume(s) uploaded successfully!',
      files: req.files
    });
  };
  