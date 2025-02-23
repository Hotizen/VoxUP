import React, { useState, useEffect } from 'react';
import './ProgressPage.css';

const ProgressPage = () => {
  const [progressData] = useState({
    labels: ['Python Basics', 'React Basics', 'JavaScript Essentials'],
    values: [80, 60, 30], // Initial progress values
  });

  const [totalProgress, setTotalProgress] = useState(0); // To calculate total progress

  // Update total progress based on progressData
  useEffect(() => {
    const total = progressData.values.reduce((acc, value) => acc + value, 0);
    setTotalProgress(Math.round(total / progressData.values.length)); // Average progress
  }, [progressData]);

  return (
    <div className="progress-page">
      <h1>Your Learning Progress</h1>
      <h2>Overall Progress: {totalProgress}%</h2>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${totalProgress}%` }}>
          <div className="progress-bar-text">{totalProgress}% Complete</div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="progress-stats">
        <div className="stat-card">
          <h3>Streak</h3>
          <p>Keep your learning streak alive to earn more rewards!</p>
        </div>
        <div className="stat-card">
          <h3>Level</h3>
          <p>Level up by completing more lessons!</p>
        </div>
        <div className="stat-card">
          <h3>Points</h3>
          <p>Earn points with every lesson completed.</p>
        </div>
      </div>

      {/* Milestones */}
      <div className="milestones-section">
        <h3>Milestones</h3>
        <div className="milestone">
          <p>✔ Completed Python Basics</p>
        </div>
        <div className="milestone">
          <p>✔ Reached Level 2</p>
        </div>
      </div>

      {/* Badges */}
      <div className="badges-container">
        <span className="badge">Python Beginner 🏅</span>
        <span className="badge">3-Day Streak 🔥</span>
      </div>

      {/* Leaderboard Button */}
      <button className="leaderboard-button" onClick={() => alert('Leaderboard coming soon!')}>
        View Leaderboard
      </button>
    </div>
  );
};

export default ProgressPage;
