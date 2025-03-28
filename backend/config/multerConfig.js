const multer = require('multer');
const path = require('path');

// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files will be saved to the 'uploads' folder
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, extension);
    cb(null, `${fileName}-${uniqueSuffix}${extension}`);
  }
});

// File Filter - Only Allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Configure Multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
