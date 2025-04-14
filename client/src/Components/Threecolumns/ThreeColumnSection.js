import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThreeColumnSection.css';

const ThreeColumnSection = () => {
  const navigate = useNavigate();

  const handleColumnClick = (path) => {
    navigate(path);
  };

  return (
    <div className="three-column-section">
      <div className="column" onClick={() => handleColumnClick('/voice-learning')}>
        <div className="card">
          <i className="fas fa-microphone fa-3x"></i>
          <h3>Voice-Controlled Learning</h3>
          <p>Interactive lessons powered by voice commands.</p>
        </div>
      </div>

      <div className="column" onClick={() => handleColumnClick('/gamified-learning')}>
        <div className="card">
          <i className="fas fa-trophy fa-3x"></i>
          <h3>Gamified Learning</h3>
          <p>Competitive coding challenges with badges and leaderboards.</p>
        </div>
      </div>

      <div className="column" onClick={() => handleColumnClick('/personalized-lessons')}>
        <div className="card">
          <i className="fas fa-chalkboard-teacher fa-3x"></i>
          <h3>Personalized Lessons</h3>
          <p>Lessons tailored to your experience and goals.</p>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnSection;
