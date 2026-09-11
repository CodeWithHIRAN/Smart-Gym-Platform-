const mongoose = require('mongoose');

// Schema for individual assigned workout (embedded)
const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  level: { type: String, default: 'Beginner' },
  duration: { type: Number, default: 30 }, // in minutes
  videoUrl: { type: String },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false }); // prevent _id for each embedded workout

// Schema for individual todo item
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { _id: true }); // Keep _id for todos to identify them easily

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'trainer', 'admin'],
    default: 'user'
  },
  workouts: [workoutSchema], // Array of embedded workouts
  todos: [todoSchema],       // Array of embedded todos
}, {
  timestamps: true // Automatically adds createdAt and updatedAt to user document
});

const sessionSchema = new mongoose.Schema({
  trainerId: String,
  trainerName: String,
  userId: String,
  userName: String,
  date: String,
  time: String,
  bookedAt: Date,
});
module.exports = mongoose.model('User', userSchema);
