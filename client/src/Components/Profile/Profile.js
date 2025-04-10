import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [badges, setBadges] = useState([]);
  const [languagesLearned, setLanguagesLearned] = useState([]);
  const [recommendedLessons, setRecommendedLessons] = useState([]);

  useEffect(() => {
    const generateBadges = (points) => {
      const earned = [];
      if (points >= 10) earned.push("Beginner");
      if (points >= 30) earned.push("Python Pro");
      if (points >= 50) earned.push("Logic Master");
      if (points >= 100) earned.push("Code Ninja");
      if (points >= 200) earned.push("AI Adventurer");
      return earned;
    };

    const fetchProgress = async () => {
      const storedUsername = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      if (storedUsername) {
        setUsername(storedUsername);
      }

      try {
        const response = await axios.get("http://localhost:5000/progress/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { points, completedLessons } = response.data.progress;
        setPoints(points);
        setCompletedLessons(completedLessons);

        const totalLessons = 10; // Update if needed
        const percentage = Math.min(
          100,
          Math.round((completedLessons.length / totalLessons) * 100)
        );
        setProgress(percentage);

        // 🔥 Dynamic Badges
        setBadges(generateBadges(points));

        // 🌍 Dynamic Languages
        const learned = new Set();
        completedLessons.forEach((lesson) => {
          if (lesson.toLowerCase().includes("python")) learned.add("Python");
          if (lesson.toLowerCase().includes("javascript")) learned.add("JavaScript");
        });
        setLanguagesLearned([...learned]);

        // 📚 Dynamic Recommendations
        const lessonPool = [
          { title: "Variables and Data Types", difficulty: "Beginner" },
          { title: "Loops in Python", difficulty: "Beginner" },
          { title: "Functions in JavaScript", difficulty: "Intermediate" },
          { title: "DOM Manipulation", difficulty: "Intermediate" },
          { title: "Object-Oriented Programming", difficulty: "Advanced" },
          { title: "API Integration", difficulty: "Advanced" },
        ];

        const recommended = lessonPool.filter(
          (lesson) => !completedLessons.includes(lesson.title)
        );
        setRecommendedLessons(recommended.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
      }
    };

    fetchProgress();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1>Welcome Back, {username}! 👋</h1>
        <button className="logout-button" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Points and Progress */}
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
