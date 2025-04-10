import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor'; // Import Monaco editor component
import './LessonScreen.css';

const LessonScreen = () => {
  const { lessonTitle } = useParams();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    try {
      const response = await fetch('${API_BASE_URL}/run-python', {
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

  // Optional: Fetch lesson content based on lessonTitle (if applicable)
  useEffect(() => {
    // Code to fetch lesson content based on lessonTitle
    // This could be used to pre-populate the code editor with lesson code
  }, [lessonTitle]); // Dependency array for useEffect

  return (
    <div className="lesson-screen">
      <h1>{lessonTitle}</h1>
      <p>Learn by practicing Python programming.</p>

      {/* Use CodeEditor component for a more advanced editing experience */}
      <CodeEditor value={code} onChange={setCode} />

      <button onClick={handleRunCode}>Run Code</button>

      <div className="output">
        <h3>Output:</h3>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default LessonScreen;