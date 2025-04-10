const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  points: { type: Number, default: 0 },
  completedLessons: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
