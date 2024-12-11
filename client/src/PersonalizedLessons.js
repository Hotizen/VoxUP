import React from 'react';
import './VoiceLearning.css';


const PersonalizedLessons = () => {
  return (
    <div className="page-container">
      <h2>Personalized Lessons</h2>
      <p>Discover custom learning paths tailored to your experience and goals.</p>
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default PersonalizedLessons;
