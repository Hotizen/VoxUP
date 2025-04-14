import React from 'react';
import './sharedLearningStyles.css';  // Importing the shared CSS file

const PersonalizedLessons = () => {
  return (
    <div className="page-container personalized-lessons">
      <h2>Personalized Lessons</h2>
      <p>Discover custom learning paths tailored to your experience and goals.</p>
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default PersonalizedLessons;
