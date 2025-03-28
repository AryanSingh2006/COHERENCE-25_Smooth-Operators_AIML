import axios from 'axios';

export const uploadResumes = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('resume', file));

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'An error occurred while uploading';
  }
};
