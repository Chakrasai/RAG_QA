// src/components/Question.jsx
import React, { useState } from 'react';
import axios from 'axios';

/**
 * Question component allows users to upload a document (PDF, DOC, DOCX under 5MB)
 * and submit a question related to the uploaded document.
 *
 * Props:
 * @param {Function} onAnswerUpdate - Callback after a successful upload/question.
 * @param {Function} setLoading - Updates loading state in parent.
 */
function Question({ onAnswerUpdate, setLoading }) {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");

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
      await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 25000
      });
      setQuestion("");
      onAnswerUpdate();
    } catch (error) {
      alert("Upload failed. Check your file or try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
        <p className="text-gray-600 mb-2">PDF, DOC, DOCX files only (max 5MB).</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full bg-white border-2 border-dashed border-blue-400 rounded-xl p-6 text-center text-blue-600 font-semibold hover:bg-blue-50 transition"
        />
        {file && (
          <div className="text-green-600 mt-2 text-sm">
            Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>

      <div className="w-full bg-white rounded-xl shadow p-4">
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your question here..."
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ask
        </button>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2 text-gray-700">Sample Questions:</h4>
        <ul className="text-sm text-gray-600 list-disc pl-5">
          <li>How can I improve this resume?</li>
          <li>What are the key clauses in this agreement?</li>
          <li>Summarize the main points of this article.</li>
          <li>Is this resume suitable for a software engineer role?</li>
        </ul>
      </div>
    </>
  );
}

export default Question;
