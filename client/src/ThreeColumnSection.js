import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import React Router's useNavigate for navigation
import './ThreeColumnSection.css';

const ThreeColumnSection = () => {
  const navigate = useNavigate(); // Initialize navigation

  // Handler for clicking on a column
  const handleColumnClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="three-column-section">
      {/* Column 1: Voice-Controlled Learning */}
      <div
        className="column"
        onClick={() => handleColumnClick('/voice-learning')} // Define the route for this column
      >
        <div className="card">
          <i className="fas fa-microphone fa-3x"></i>
          <h3>Voice-Controlled Learning</h3>
          <p>VoxUp utilizes voice commands to make coding lessons more interactive and accessible, offering hands-free operation.</p>
        </div>
      </div>

      {/* Column 2: Gamified Learning */}
      <div
        className="column"
        onClick={() => handleColumnClick('/gamified-learning')} // Define the route for this column
      >
        <div className="card">
          <i className="fas fa-trophy fa-3x"></i>
          <h3>Gamified Learning</h3>
          <p>With gamified assessments, badges, and leaderboards, VoxUp turns learning into a fun, competitive experience.</p>
        </div>
      </div>

      {/* Column 3: Personalized Lessons */}
      <div
        className="column"
        onClick={() => handleColumnClick('/personalized-lessons')} // Define the route for this column
      >
        <div className="card">
          <i className="fas fa-chalkboard-teacher fa-3x"></i>
          <h3>Personalized Lessons</h3>
          <p>VoxUp adapts its lessons based on your learning style and experience level, offering personalized coding paths.</p>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnSection;
