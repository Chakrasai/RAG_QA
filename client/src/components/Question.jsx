import React, { useState } from 'react';
import axios from 'axios';

function Question({ onAnswerUpdate }) {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const maxSize = 5 * 1024 * 1024;
    return file && allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      alert("Invalid file. Only PDF, DOC, DOCX under 5MB allowed.");
      setFile(null);
      e.target.value = null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file || !question.trim()) {
      alert("Please upload a document and enter your question.");
      return;
    }

    const formData = new FormData();
    formData.append("text", question.trim());
    formData.append("file", file);

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 15000
      });
      alert("Document uploaded successfully!");
      
      setQuestion("");
      onAnswerUpdate();
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        alert("Request timed out. Please try again.");
      } else if (error.response) {
        alert(`Server error: ${error.response.data?.message || error.response.statusText}`);
      } else {
        alert("There was an error uploading the document.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
        <p className="text-gray-600 mb-2">Drag and drop your document here or click to select a file.</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          disabled={loading}
          className="w-full bg-white border-2 border-dashed border-blue-400 rounded-xl p-6 text-center text-blue-600 font-semibold hover:bg-blue-50 transition"
        />
        {file && (
          <div className="text-green-600 mt-2 text-sm">
            Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}
        <span role="img" aria-label="Upload Document">📤 Upload Document</span>
      </div>

      <div className="w-full bg-white rounded-xl shadow p-4">
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your question here..."
          rows="4"
          cols="50"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleClick}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Ask"}
        </button>
      </div>
    </>
  );
}

export default Question;
