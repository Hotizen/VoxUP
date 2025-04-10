import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [badges, setBadges] = useState([]);
  const [languagesLearned, setLanguagesLearned] = useState([]);
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  const [rank, setRank] = useState(null);
  const [upcomingBadges, setUpcomingBadges] = useState([]);

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

    const determineUpcomingBadges = (points) => {
      const allBadges = [
        { name: "Beginner", threshold: 10 },
        { name: "Python Pro", threshold: 30 },
        { name: "Logic Master", threshold: 50 },
        { name: "Code Ninja", threshold: 100 },
        { name: "AI Adventurer", threshold: 200 },
      ];
      return allBadges.filter(b => b.threshold > points);
    };

    const fetchData = async () => {
      const storedUsername = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      if (storedUsername) setUsername(storedUsername);

      try {
        const res = await axios.get("http://localhost:5000/progress/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { points, completedLessons, rank } = res.data.progress;
        setPoints(points);
        setRank(rank);
        setProgress(
          Math.min(100, Math.round((completedLessons.length / 10) * 100))
        );

        const earnedBadges = generateBadges(points);
        setBadges(earnedBadges);
        setUpcomingBadges(determineUpcomingBadges(points));

        const learned = new Set();
        completedLessons.forEach((lesson) => {
          if (lesson.toLowerCase().includes("python")) learned.add("Python");
          if (lesson.toLowerCase().includes("javascript")) learned.add("JavaScript");
        });
        setLanguagesLearned([...learned]);

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

    fetchData();
  }, [navigate]);

  return (
    <div className="profile-wrapper">
      <h2 className="profile-heading">👤 {username}'s Profile</h2>

      <div className="stats-box">
        <div className="stat-item">
          <span className="stat-label">🔥 Points</span>
          <span className="stat-value">{points}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">📈 Progress</span>
          <span className="stat-value">{progress}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">🏅 Badges</span>
          <div className="badges-list">
            {badges.length > 0 ? badges.map((b, i) => (
              <span className="badge-tag" key={i}>{b}</span>
            )) : <span className="no-badge">No badges yet</span>}
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-label">🌍 Languages Learned</span>
          <div className="languages-list">
            {languagesLearned.length > 0 ? languagesLearned.map((l, i) => (
              <span className="language-tag" key={i}>{l}</span>
            )) : <span className="no-lang">None yet</span>}
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-label">🏆 Leaderboard Rank</span>
          <span className="stat-value">#{rank || "N/A"}</span>
        </div>
      </div>

      <div className="recommend-box">
        <h4>📚 Recommended Lessons</h4>
        <ul className="recommend-list">
          {recommendedLessons.map((lesson, index) => (
            <li className="lesson-item" key={index}>
              {lesson.title} <span className="lesson-diff">{lesson.difficulty}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="recommend-box" style={{ marginTop: "20px" }}>
        <h4>🚀 Upcoming Badges</h4>
        <ul className="recommend-list">
          {upcomingBadges.length > 0 ? (
            upcomingBadges.map((badge, index) => (
              <li className="lesson-item" key={index}>
                {badge.name} <span className="lesson-diff">at {badge.threshold} pts</span>
              </li>
            ))
          ) : (
            <li className="lesson-item">🎉 You've unlocked all badges!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;