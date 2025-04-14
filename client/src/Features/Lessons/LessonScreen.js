import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor'; // Import Monaco editor component
import './LessonScreen.css';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const LessonScreen = () => {
  const { lessonTitle } = useParams();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/run-python`, {  // Fix template string
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

  useEffect(() => {
    // Fetch lesson content based on lessonTitle (optional for pre-population)
    // Example: Fetch lesson data from an API or database and pre-fill the code editor
  }, [lessonTitle]); // Dependency array ensures the effect runs when lessonTitle changes

  return (
    <div className="lesson-screen">
      <h1>{lessonTitle}</h1>
      <p>Learn by practicing Python programming.</p>

      <CodeEditor value={code} onChange={setCode} /> {/* Monaco editor */}

      <button onClick={handleRunCode}>Run Code</button>

      <div className="output">
        <h3>Output:</h3>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default LessonScreen;
