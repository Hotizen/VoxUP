const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey123";

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: "Access Denied!" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

// Get user achievements
router.get('/me', verifyToken, async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.user.id })
      .sort({ unlockedAt: -1 });

    res.json({ achievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check and award achievements
router.post('/check', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAchievements = [];

    // Define achievement conditions
    const achievementConditions = [
      {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Complete your first lesson',
        type: 'milestone',
        icon: '👶',
        points: 25,
        condition: () => user.completedLessons.length >= 1
      },
      {
        id: 'python_novice',
        title: 'Python Novice',
        description: 'Earn your first 50 points',
        type: 'badge',
        icon: '🐍',
        points: 50,
        condition: () => user.points >= 50
      },
      {
        id: 'code_warrior',
        title: 'Code Warrior',
        description: 'Earn 100 points',
        type: 'badge',
        icon: '⚔️',
        points: 75,
        condition: () => user.points >= 100
      },
      {
        id: 'lesson_lover',
        title: 'Lesson Lover',
        description: 'Complete 5 lessons',
        type: 'milestone',
        icon: '📚',
        points: 100,
        condition: () => user.completedLessons.length >= 5
      },
      {
        id: 'knowledge_seeker',
        title: 'Knowledge Seeker',
        description: 'Complete 10 lessons',
        type: 'milestone',
        icon: '🔍',
        points: 150,
        condition: () => user.completedLessons.length >= 10
      },
      {
        id: 'python_expert',
        title: 'Python Expert',
        description: 'Earn 500 points',
        type: 'badge',
        icon: '🏆',
        points: 200,
        rarity: 'epic',
        condition: () => user.points >= 500
      }
    ];

    // Check each achievement
    for (const achCondition of achievementConditions) {
      // Check if user already has this achievement
      const existingAchievement = await Achievement.findOne({
        userId: req.user.id,
        title: achCondition.title
      });

      if (!existingAchievement && achCondition.condition()) {
        const achievement = new Achievement({
          userId: req.user.id,
          type: achCondition.type,
          title: achCondition.title,
          description: achCondition.description,
          icon: achCondition.icon,
          points: achCondition.points,
          rarity: achCondition.rarity || 'common'
        });

        await achievement.save();
        newAchievements.push(achievement);

        // Award points for achievement
        await User.findByIdAndUpdate(req.user.id, {
          $inc: { points: achCondition.points }
        });
      }
    }

    res.json({ 
      message: 'Achievements checked',
      newAchievements,
      count: newAchievements.length
    });
  } catch (error) {
    console.error('Error checking achievements:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;