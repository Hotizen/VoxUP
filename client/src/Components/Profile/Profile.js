import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [points, setPoints] = useState(1200);
  const [progress, setProgress] = useState(75);
  const [badges, setBadges] = useState(["Beginner", "Python Pro", "Logic Master"]);
  const [languagesLearned, setLanguagesLearned] = useState(["Python", "JavaScript"]);
  const [recommendedLessons, setRecommendedLessons] = useState([
    { title: "Loops in Python", difficulty: "Beginner" },
    { title: "Functions in JavaScript", difficulty: "Intermediate" },
    { title: "Object-Oriented Programming", difficulty: "Advanced" },
  ]);

  useEffect(() => {
    // ✅ Fetch username from localStorage
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // ✅ Redirect to login if not authenticated
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <h1>Welcome Back, {username}! 👋</h1>
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button> {/* ✅ Logout Button */}
      </div>

      {/* Profile Overview */}
      <div className="profile-info">
        <div className="points-progress">
          <h3>🔥 Points: {points}</h3>
          <h3>📈 Progress: {progress}%</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="badges-section">
          <h3>🏅 Badges Earned</h3>
          <div className="badges">
            {badges.map((badge, index) => (
              <span key={index} className="badge">{badge}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Lessons */}
      <div className="recommended-lessons">
        <h3>📚 Recommended Lessons</h3>
        <ul>
          {recommendedLessons.map((lesson, index) => (
            <li key={index} className="lesson-item">
              {lesson.title} <span className="difficulty">{lesson.difficulty}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Languages Learned */}
      <div className="languages-learned">
        <h3>🌍 Languages Learned</h3>
        <div className="languages">
          {languagesLearned.map((lang, index) => (
            <span key={index} className="language">{lang}</span>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="profile-buttons">
        <button onClick={() => navigate("/leaderboard")}>🏆 Leaderboard</button>
        <button onClick={() => navigate("/compiler")}>💻 Compiler</button>
        <button onClick={() => navigate("/challenges")}>⚔️ Challenges</button>
      </div>
    </div>
  );
};

export default Profile;
