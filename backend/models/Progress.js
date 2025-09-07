const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  lessonId: { 
    type: String, 
    required: true 
  },
  lessonTitle: { 
    type: String, 
    required: true 
  },
  completedAt: { 
    type: Date, 
    default: Date.now 
  },
  timeSpent: { 
    type: Number, 
    default: 0 // in minutes
  },
  score: { 
    type: Number, 
    default: 0 
  },
  attempts: { 
    type: Number, 
    default: 1 
  },
  status: {
    type: String,
    enum: ['started', 'in_progress', 'completed', 'failed'],
    default: 'started'
  }
}, { timestamps: true });

// Compound index to prevent duplicate progress entries
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);