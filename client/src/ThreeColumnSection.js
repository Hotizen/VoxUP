import React from 'react';
import './ThreeColumnSection.css';

const ThreeColumnSection = () => {
  return (
    <div className="three-column-section">
      <div className="column">
        <div className="card">
          <i className="fas fa-microphone fa-3x"></i>
          <h3>Voice-Controlled Learning</h3>
          <p>VoxUp utilizes voice commands to make coding lessons more interactive and accessible, offering hands-free operation.</p>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <i className="fas fa-trophy fa-3x"></i>
          <h3>Gamified Learning</h3>
          <p>With gamified assessments, badges, and leaderboards, VoxUp turns learning into a fun, competitive experience.</p>
        </div>
      </div>
      <div className="column">
        <div className="card">
          <i className="fas fa-chalkboard-teacher fa-3x"></i>
          <h3>Personalized Lessons</h3>
          <p>VoxUp adapts its lessons based on your learning style and experience level, offering personalized coding paths.</p>
        </div>
      </div>
      {/* <div className="column">
        <div className="card">
          <i className="fas fa-users fa-3x"></i>
          <h3>Community Support</h3>
          <p>Join a growing community of learners and mentors who can help you achieve your coding goals through collaboration.</p>
        </div>
      </div> */}
    </div>
  );
};

export default ThreeColumnSection;
