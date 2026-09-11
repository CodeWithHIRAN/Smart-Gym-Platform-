const mongoose = require('mongoose');

const workoutAssignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('WorkoutAssignment', workoutAssignmentSchema);
