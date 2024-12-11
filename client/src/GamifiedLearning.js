import React from 'react';
import './VoiceLearning.css';


const GamifiedLearning = () => {
  return (
    <div className="page-container">
      <h2>Gamified Learning</h2>
      <p>Engage in competitive coding challenges and earn badges while you learn.</p>
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default GamifiedLearning;
