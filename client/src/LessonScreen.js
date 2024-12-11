import React, { useState } from 'react';
import './LessonScreen.css';
import { useParams } from 'react-router-dom';

const LessonScreen = () => {
  const { lessonTitle } = useParams();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/run-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setOutput(data.result);
    } catch (error) {
      setOutput('Error: Unable to process code.');
    }
  };

  return (
    <div className="lesson-screen">
      <h1>{lessonTitle}</h1>
      <p>Learn by practicing Python programming.</p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
      ></textarea>

      <button onClick={handleRunCode}>Run Code</button>

      <div className="output">
        <h3>Output:</h3>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default LessonScreen;
