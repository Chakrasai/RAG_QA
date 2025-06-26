import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function Answer({ refresh }) {
  const [data, setData] = useState({
    answer: "Upload a document and ask a question",
    question: ""
  });

  useEffect(() => {
    axios.get('https://rag-qa-kzpr.onrender.com/answers')
      .then(response => {
        const latest = response.data.answers?.[0];
        if (latest) {
          setData({
            answer: latest.answer || "",
            question: latest.question || ""
          });
        }
      })
      .catch(console.error);
  }, [refresh]);

  return (
    <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-6 min-h-[400px]">
      <div className="text-gray-700">
        <h3 className="font-semibold text-black text-xl mb-2">
          {data.question}
        </h3>
        <p className="text-blue-500">
          <ReactMarkdown>
            {data.answer}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
}

export default Answer;
