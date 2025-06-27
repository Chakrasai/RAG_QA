import React, { useState } from 'react';
import Header from './components/Header';
import Question from './components/Question';
import Answer from './components/Answer';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnswerUpdate = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-row gap-6 p-6">
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <Question
            onAnswerUpdate={handleAnswerUpdate}
            setLoading={setLoading}
          />
        </div>
        <Answer refresh={refresh} loading={loading} />
      </div>
    </div>
  );
}

export default App;
