const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
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

// Get all lessons with user progress
router.get('/', async (req, res) => {
  try {
    const { language = 'python', difficulty, page = 1, limit = 10 } = req.query;
    
    const filter = { isActive: true };
    if (language) filter.language = language;
    if (difficulty) filter.difficulty = difficulty;

    const lessons = await Lesson.find(filter)
      .sort({ order: 1, createdAt: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // If user is authenticated, get their progress
    let userProgress = {};
    const token = req.header('Authorization');
    if (token) {
      try {
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        const progress = await Progress.find({ userId: verified.id });
        userProgress = progress.reduce((acc, p) => {
          acc[p.lessonId] = p;
          return acc;
        }, {});
      } catch (error) {
        // Token invalid, continue without progress
      }
    }

    const lessonsWithProgress = lessons.map(lesson => ({
      ...lesson.toObject(),
      progress: userProgress[lesson._id.toString()] || null,
      isCompleted: userProgress[lesson._id.toString()]?.status === 'completed',
      isLocked: false // TODO: Implement prerequisite logic
    }));

    res.json({ lessons: lessonsWithProgress });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lesson
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ lesson });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start lesson (create progress entry)
router.post('/:id/start', verifyToken, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if progress already exists
    let progress = await Progress.findOne({
      userId: req.user.id,
      lessonId: req.params.id
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        lessonId: req.params.id,
        lessonTitle: lesson.title,
        status: 'started'
      });
      await progress.save();
    }

    res.json({ message: 'Lesson started', progress });
  } catch (error) {
    console.error('Error starting lesson:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete lesson
router.post('/:id/complete', verifyToken, async (req, res) => {
  try {
    const { score = 100, timeSpent = 0 } = req.body;
    
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    let progress = await Progress.findOne({
      userId: req.user.id,
      lessonId: req.params.id
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        lessonId: req.params.id,
        lessonTitle: lesson.title
      });
    }

    progress.status = 'completed';
    progress.score = Math.max(progress.score, score);
    progress.timeSpent += timeSpent;
    progress.completedAt = new Date();
    
    await progress.save();

    // Update user points
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { points: lesson.points },
      $addToSet: { completedLessons: req.params.id }
    });

    res.json({ 
      message: 'Lesson completed', 
      progress,
      pointsEarned: lesson.points
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new lesson (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const lesson = new Lesson({
      ...req.body,
      createdBy: req.user.id
    });
    
    await lesson.save();
    res.status(201).json({ message: 'Lesson created', lesson });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;