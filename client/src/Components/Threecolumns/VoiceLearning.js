import React from 'react';
import './sharedLearningStyles.css';  // Importing the shared CSS file

const VoiceLearning = () => {
  return (
    <div className="page-container voice-learning">
      <h2>Voice-Controlled Learning</h2>
      <p>
        Explore interactive lessons powered by voice commands to enhance your coding journey.
        Experience hands-free navigation and interactive exercises tailored for your convenience.
      </p>
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default VoiceLearning;
