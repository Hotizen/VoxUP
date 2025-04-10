const express = require('express');
const router = express.Router();
const User = require('./models/User');
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

// ✅ Add Completed Lesson & Points
router.post('/update', verifyToken, async (req, res) => {
  const { lessonId, pointsEarned } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Add lesson only if not already completed
    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId);
    }

    // Add points
    user.points += pointsEarned || 0;

    await user.save();

    res.status(200).json({ message: "Progress updated", user });
  } catch (err) {
    console.error("Progress Update Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Progress
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ progress: {
      points: user.points,
      completedLessons: user.completedLessons
    }});
  } catch (err) {
    console.error("Progress Fetch Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Leaderboard - Top 10 Users by Points
router.get('/leaderboard', async (req, res) => {
    try {
      const topUsers = await User.find({})
        .sort({ points: -1 })        // Highest points first
        .limit(10)                   // Top 10 users
        .select('username points');  // Return only name and points
  
      res.status(200).json({ leaderboard: topUsers });
    } catch (err) {
      console.error("Leaderboard Fetch Error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
