import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, X } from 'lucide-react';
import './App.css';

const PDFDragDrop = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
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

    const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
    if (files.length === 0) {
      alert('Only PDF files are allowed!');
      return;
    }
    setSelectedFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
    if (files.length === 0) {
      alert('Only PDF files are allowed!');
      return;
    }
    setSelectedFiles(files);
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select PDF files to upload.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('resume', file));

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:3000/upload', formData);
      setMessage(response.data.message);
      setSelectedFiles([]);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFiles.length > 0 ? (
          selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <FileText className="text-blue-500" />
                <span className="truncate max-w-[200px]">{file.name}</span>
              </div>
              <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                <X />
              </button>
            </div>
          ))
        ) : (
          <>
            <input 
              type="file" 
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600">Drag and drop PDF files here, or <span className="text-blue-500 ml-1 hover:underline">browse</span></p>
              <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB</p>
            </label>
          </>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <button 
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload PDF(s)'}
        </button>
      )}

      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default PDFDragDrop;