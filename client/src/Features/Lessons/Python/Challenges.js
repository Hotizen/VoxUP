import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Challenges.css";

const Challenges = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleChallengeComplete = () => {
    const newProgress = progress + 1;
    setPoints(points + 1);
    setProgress(newProgress);
    localStorage.setItem("pythonTutorialProgress", newProgress);
  };

  return (
    <div className="challenges-container">
      <h1 className="challenges-title">Python Challenges</h1>
      <p className="challenges-subtitle">Select a challenge and test your Python skills!</p>

      <div className="challenge-list">
        <div className="challenge-card">
          <h2 className="challenge-title">Drag and Drop Challenge</h2>
          <p className="challenge-description">
            Drag the correct Python code snippets to form a valid program.
          </p>
          <button className="challenge-btn" onClick={() => navigate('/drag-and-drop')}>
            Start Drag and Drop Challenge
          </button>
        </div>

        <div className="challenge-card">
          <h2 className="challenge-title">Code Completion Challenge</h2>
          <p className="challenge-description">
            Fill in the missing parts of the Python code.
          </p>
          <button className="challenge-btn" onClick={() => navigate('/code-complete')}>
            Start Code Completion Challenge
          </button>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate("/python-basics")}>
        ⬅ Back to Course
      </button>
    </div>
  );
};

export default Challenges;
