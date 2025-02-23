import React from 'react';
import './VoiceLearning.css';

const VoiceLearning = () => {
  return (
    <div className="page-container">
      <h2>Voice-Controlled Learning</h2>
      <p>
        Explore interactive lessons powered by voice commands to enhance your coding journey. Experience hands-free navigation and interactive exercises tailored for your convenience.
      </p>
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default VoiceLearning;