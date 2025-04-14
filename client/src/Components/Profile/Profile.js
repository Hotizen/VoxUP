import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "User",
    points: 0,
    progress: 0,
    badges: [],
    languagesLearned: [],
    recommendedLessons: [],
    rank: null,
    upcomingBadges: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      if (storedUsername) setUserData((prevData) => ({ ...prevData, username: storedUsername }));

      try {
        const res = await axios.get("${API_BASE_URL}/progress/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { points, completedLessons, rank } = res.data.progress;
        const badges = generateBadges(points);
        const upcomingBadges = determineUpcomingBadges(points);
        const languagesLearned = getLanguagesLearned(completedLessons);
        const recommendedLessons = getRecommendedLessons(completedLessons);

        setUserData((prevData) => ({
          ...prevData,
          points,
          rank,
          progress: Math.min(100, Math.round((completedLessons.length / 10) * 100)),
          badges,
          upcomingBadges,
          languagesLearned,
          recommendedLessons,
        }));
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const generateBadges = (points) => {
    const earned = [];
    const badgeThresholds = [
      { name: "Beginner", threshold: 10 },
      { name: "Python Pro", threshold: 30 },
      { name: "Logic Master", threshold: 50 },
      { name: "Code Ninja", threshold: 100 },
      { name: "AI Adventurer", threshold: 200 },
    ];

    badgeThresholds.forEach((badge) => {
      if (points >= badge.threshold) earned.push(badge.name);
    });

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
    return allBadges.filter(badge => badge.threshold > points);
  };

  const getLanguagesLearned = (completedLessons) => {
    const learned = new Set();
    completedLessons.forEach((lesson) => {
      if (lesson.toLowerCase().includes("python")) learned.add("Python");
      if (lesson.toLowerCase().includes("javascript")) learned.add("JavaScript");
    });
    return [...learned];
  };

  const getRecommendedLessons = (completedLessons) => {
    const lessonPool = [
      { title: "Variables and Data Types", difficulty: "Beginner" },
      { title: "Loops in Python", difficulty: "Beginner" },
      { title: "Functions in JavaScript", difficulty: "Intermediate" },
      { title: "DOM Manipulation", difficulty: "Intermediate" },
      { title: "Object-Oriented Programming", difficulty: "Advanced" },
      { title: "API Integration", difficulty: "Advanced" },
    ];
    return lessonPool.filter(lesson => !completedLessons.includes(lesson.title)).slice(0, 3);
  };

  return (
    <div className="profile-wrapper">
      <h2 className="profile-heading">👤 {userData.username}'s Profile</h2>

      <div className="stats-box">
        {[
          { label: "🔥 Points", value: userData.points },
          { label: "📈 Progress", value: `${userData.progress}%` },
          { label: "🏅 Badges", value: userData.badges.length ? userData.badges.join(", ") : "No badges yet" },
          { label: "🌍 Languages Learned", value: userData.languagesLearned.length ? userData.languagesLearned.join(", ") : "None yet" },
          { label: "🏆 Leaderboard Rank", value: `#${userData.rank || "N/A"}` },
        ].map(({ label, value }, idx) => (
          <div className="stat-item" key={idx}>
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="recommend-box">
        <h4>📚 Recommended Lessons</h4>
        <ul className="recommend-list">
          {userData.recommendedLessons.map((lesson, index) => (
            <li className="lesson-item" key={index}>
              {lesson.title} <span className="lesson-diff">{lesson.difficulty}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="recommend-box" style={{ marginTop: "20px" }}>
        <h4>🚀 Upcoming Badges</h4>
        <ul className="recommend-list">
          {userData.upcomingBadges.length ? (
            userData.upcomingBadges.map((badge, index) => (
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
