import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await axios.post("http://127.0.0.1:8000/process-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(result.data);
      console.log("Server Response:", result.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h1>Resume Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {response && (
        <div>
          <h2>Extracted Information</h2>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
          <h3>Applicant Status: {response.data.shortlisted ? "✅ Shortlisted" : "❌ Not Shortlisted"}</h3>
          <h3>Score: {response.data.score}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
