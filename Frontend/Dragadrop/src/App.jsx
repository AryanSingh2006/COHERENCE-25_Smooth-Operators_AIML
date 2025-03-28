import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import './App.css'

const PDFDragDrop = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    if (file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload only PDF files');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Implement your file upload logic here
      console.log('Uploading file:', selectedFile);
      // Example: You might use fetch or axios to upload the file
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // axios.post('/upload', formData)
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-500'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500" />
              <span className="truncate max-w-[200px]">{selectedFile.name}</span>
            </div>
            <button 
              onClick={removeFile} 
              className="text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </div>
        ) : (
          <>
            <input 
              type="file" 
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              id="fileInput"
            />
            <label 
              htmlFor="fileInput" 
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600">
                Drag and drop PDF here, or 
                <span className="text-blue-500 ml-1 hover:underline">
                  browse
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Maximum file size: 10MB
              </p>
            </label>
          </>
        )}
      </div>

      {selectedFile && (
        <button 
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Upload PDF
        </button>
      )}
    </div>
  );
};

export default PDFDragDrop;
