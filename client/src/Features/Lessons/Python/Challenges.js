import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Challenges.css";

const Challenges = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleChallengeComplete = () => {
    setPoints(points + 1); // Award points
    setProgress(progress + 1); // Increase progress
    localStorage.setItem("pythonTutorialProgress", progress + 1);
  };

  return (
    <div className="challenges-container">
      <h1>Python Challenges</h1>
      <p>Select a challenge and test your Python skills!</p>

      {/* Drag and Drop Challenge */}
      <div className="challenge">
        <h2>Drag and Drop Challenge</h2>
        <p>Drag the correct Python code snippets to form a valid program.</p>
        <button onClick={() => navigate('/drag-and-drop')}>
          Start Drag and Drop Challenge
        </button>
      </div>

      {/* Code Completion Challenge */}
      <div className="challenge">
        <h2>Code Completion Challenge</h2>
        <p>Fill in the missing parts of the Python code.</p>
        <button onClick={() => navigate('/code-complete')}>
          Start Code Completion Challenge
        </button>
      </div>

      <button onClick={() => navigate("/python-basics")}>Back to Course</button>
    </div>
  );
};

export default Challenges;
