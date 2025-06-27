import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from './LoadingSpinner';

/**
 * Answer component displays the latest generated answer and the question.
 * Shows a loading spinner while the answer is being fetched.
 *
 * @param {Object} props
 * @param {boolean} props.refresh - Trigger for fetching new answer.
 * @param {boolean} props.loading - If true, displays loading spinner.
 */
function Answer({ refresh, loading }) {
  const [data, setData] = useState({ answer: '', question: '' });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/answers`)
      .then(response => {
        const latest = response.data.answers?.[0];
        if (latest) {
          setData({
            answer: latest.answer || '',
            question: latest.question || ''
          });
        }
      })
      .catch(console.error);
  }, [refresh]);

  return (
    <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-6 min-h-[400px]">
      <div className="text-gray-700">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            <LoadingSpinner />
            <p className="text-blue-500">Generating answer...</p>
          </div>
        ) : data.answer ? (
          <>
            <h3 className="font-semibold text-black text-xl mb-2">{data.question}</h3>
            <div className="prose prose-sm text-blue-500">
              <ReactMarkdown>
                {data.answer}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Upload a document and ask a question.</p>
        )}
      </div>
    </div>
  );
}

export default Answer;
