import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Question from './components/Question';
import Answer from './components/Answer';

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleAnswerUpdate = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-row gap-6 p-6">
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <Question onAnswerUpdate={handleAnswerUpdate} />
        </div>
        <Answer refresh={refreshCount} />
      </div>
    </div>
  );
}

export default App;
