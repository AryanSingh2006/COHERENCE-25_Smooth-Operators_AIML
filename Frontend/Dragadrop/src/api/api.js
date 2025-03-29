import axios from 'axios';

export const uploadResumes = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('resume', file));

  try {
    const response = await axios.post('http://127.0.0.1:8000/process-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // This should include extracted data
  } catch (error) {
    throw error.response?.data?.error || 'An error occurred while uploading';
  }
};

export const getShortlistedCandidates = async (resumeData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/shortlist', resumeData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error in shortlisting candidates';
  }
};
