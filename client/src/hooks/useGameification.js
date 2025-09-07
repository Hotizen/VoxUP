import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const useGameification = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);

  useEffect(() => {
    fetchUserProgress();
  }, []);

  const fetchUserProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${API_BASE_URL}/progress/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { points: userPoints, completedLessons } = response.data.progress;
      setPoints(userPoints);
      setLevel(Math.floor(userPoints / 100) + 1);
      setStreak(calculateStreak());
      setBadges(generateBadges(userPoints, completedLessons));
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const calculateStreak = () => {
    // Simple streak calculation - in real app, track daily activity
    const lastActivity = localStorage.getItem('lastActivity');
    const today = new Date().toDateString();
    
    if (lastActivity === today) {
      return parseInt(localStorage.getItem('streak') || '1');
    }
    
    localStorage.setItem('lastActivity', today);
    const newStreak = lastActivity ? parseInt(localStorage.getItem('streak') || '0') + 1 : 1;
    localStorage.setItem('streak', newStreak.toString());
    return newStreak;
  };

  const generateBadges = (userPoints, completedLessons) => {
    const badges = [];
    
    if (userPoints >= 10) badges.push('First Steps');
    if (userPoints >= 50) badges.push('Python Novice');
    if (userPoints >= 100) badges.push('Code Warrior');
    if (userPoints >= 250) badges.push('Logic Master');
    if (userPoints >= 500) badges.push('Python Expert');
    if (completedLessons.length >= 5) badges.push('Lesson Lover');
    if (completedLessons.length >= 10) badges.push('Knowledge Seeker');
    
    return badges;
  };

  const awardPoints = async (pointsToAdd, reason = 'Lesson completed') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post(`${API_BASE_URL}/progress/update`, {
        pointsEarned: pointsToAdd,
        lessonId: reason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const newPoints = points + pointsToAdd;
      const newLevel = Math.floor(newPoints / 100) + 1;
      
      setPoints(newPoints);
      
      // Check for level up
      if (newLevel > level) {
        setLevel(newLevel);
        showAchievementPopup({
          title: `Level ${newLevel} Reached!`,
          description: `You've reached level ${newLevel}! Keep up the great work!`,
          points: 50,
          type: 'level'
        });
      }

      // Check for new badges
      const newBadges = generateBadges(newPoints, []);
      const earnedNewBadge = newBadges.find(badge => !badges.includes(badge));
      
      if (earnedNewBadge) {
        setBadges(newBadges);
        showAchievementPopup({
          title: `${earnedNewBadge} Badge Earned!`,
          description: `Congratulations! You've earned the ${earnedNewBadge} badge!`,
          points: 25,
          type: 'badge'
        });
      }

    } catch (error) {
      console.error('Failed to award points:', error);
    }
  };

  const showAchievementPopup = (achievement) => {
    setShowAchievement(achievement);
    setTimeout(() => setShowAchievement(null), 5000);
  };

  const closeAchievementPopup = () => {
    setShowAchievement(null);
  };

  return {
    points,
    level,
    badges,
    streak,
    achievements,
    showAchievement,
    awardPoints,
    closeAchievementPopup,
    fetchUserProgress
  };
};