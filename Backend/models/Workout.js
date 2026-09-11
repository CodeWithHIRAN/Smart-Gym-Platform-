const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: String,
  category: String,
  level: String,
  duration: Number,
  videoUrl: String
});

module.exports = mongoose.model('Workout', workoutSchema);