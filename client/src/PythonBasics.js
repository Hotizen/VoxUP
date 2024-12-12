import React, { useState, useEffect } from 'react';
import './PythonBasics.css';
import DragAndDropLesson from './DragAndDropLesson'; // Import Drag-and-Drop Lesson

const PythonBasics = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [points, setPoints] = useState(50); // Default points
  const [level, setLevel] = useState(1); // Default level
  const [streak, setStreak] = useState(0); // Daily streak
  const [lastActiveDate, setLastActiveDate] = useState(null);

  // Check streak on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastActiveDate !== today) {
      setLastActiveDate(today);
      setStreak((prev) => (lastActiveDate ? prev + 1 : 1)); // Increment streak
    }
  }, [lastActiveDate]);

  // Calculate level based on points
  useEffect(() => {
    const newLevel = Math.floor(points / 50) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [points, level]);

  const handleRunCode = async () => {
    try {
      const escapedCode = code.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      const response = await fetch('http://localhost:5000/run-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: escapedCode }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setOutput(data.result); // Display output from backend
      setPoints((prev) => prev + 10); // Increment points on successful execution
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="python-basics">
      {/* Header Section */}
      <header className="header">
        <h1>Python Basics</h1>
        <p>
          Python is a versatile and beginner-friendly programming language. Let's get started by writing our first line of Python code!
        </p>
      </header>

      {/* Learning Guide Section */}
      <section className="learning-guide">
        <h2>How to Write Your First Program</h2>
        <p>
          To create your first Python program, you can use the <strong>print()</strong> function to display messages on the screen.
          For example:
        </p>
        <pre>print("Hello, World!")</pre>
        <p>
          This simple line of code will output <strong>Hello, World!</strong> on the console.
        </p>
      </section>

      {/* Streak and Level Section */}
      <section className="gamified-stats">
        <div className="stat">
          <i className="fas fa-fire fa-2x"></i>
          <h3>Streak: {streak} {streak === 1 ? 'day' : 'days'}</h3>
          <p>Keep your streak alive by running code daily!</p>
        </div>
        <div className="stat">
          <i className="fas fa-level-up-alt fa-2x"></i>
          <h3>Level: {level}</h3>
          <p>{50 - (points % 50)} points to next level</p>
        </div>
      </section>

      {/* Compiler Section */}
      <section className="code-editor">
        <h2>Try It Yourself</h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your Python code here..."
          rows="8"
        ></textarea>
        <button className="btn btn-success" onClick={handleRunCode}>
          Run Code
        </button>
        <div className="output">
          <h3>Output:</h3>
          <p>{output}</p>
        </div>
      </section>

      <section className="drag-and-drop">
        <h2>Arrange the Code Blocks in Correct Order</h2>
        <DragAndDropLesson /> {/* Add Drag and Drop Lesson */}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="badges">
          <h3>Your Badges</h3>
          <span className="badge">Python Beginner 🏅</span>
          {streak >= 3 && <span className="badge">3-Day Streak 🔥</span>}
          {streak >= 7 && <span className="badge">1-Week Streak 🌟</span>}
        </div>
        <div className="points">
          <h3>Your Points: {points}</h3>
        </div>
        <button
          className="btn btn-info leaderboard-button"
          onClick={() => alert('Leaderboard coming soon!')}
        >
          View Leaderboard
        </button>
      </footer>
    </div>
  );
};

export default PythonBasics;
