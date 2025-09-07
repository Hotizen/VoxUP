const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  content: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['python', 'javascript', 'html', 'css', 'react'],
    default: 'python'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: { 
    type: Number, // in minutes
    default: 30 
  },
  points: { 
    type: Number, 
    default: 10 
  },
  order: { 
    type: Number, 
    default: 0 
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  tags: [String],
  codeExamples: [{
    title: String,
    code: String,
    explanation: String
  }],
  exercises: [{
    question: String,
    initialCode: String,
    solution: String,
    hints: [String],
    testCases: [{
      input: String,
      expectedOutput: String
    }]
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

lessonSchema.index({ language: 1, difficulty: 1, order: 1 });

module.exports = mongoose.model("Lesson", lessonSchema);