// src/ImageAnalyzer.js

import React, { useState } from 'react';
import axios from 'axios';

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const analyzeImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: "Describe the content of the image",
          n: 1,
          size: "1024x1024"
        },
        {
          headers: {
            'Authorization': `Bearer sk-proj-1F0apebNDyF9ktzQJ6n3T3BlbkFJ0pLanGWZwHYwig2bRXvs`,
            'Content-Type': 'application/json'
          }
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing the image:', error);
    }
  };

  return (
    <div>
      <h1>Image Analyzer</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={analyzeImage}>Analyze Image</button>
      {result && (
        <div>
          <h2>Analysis Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
