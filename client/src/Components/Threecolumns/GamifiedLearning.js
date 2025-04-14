import React from 'react';
import './sharedLearningStyles.css';  // Importing the shared CSS file

const GamifiedLearning = () => {
  return (
    <div className="page-container gamified-learning">
      <h2>Gamified Learning</h2>
      <p>Engage in competitive coding challenges and earn badges while you learn.</p>
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default GamifiedLearning;
