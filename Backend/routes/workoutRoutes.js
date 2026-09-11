// routes/workoutRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/assign-workout', async (req, res) => {
  try {
    const { userId, workout } = req.body;

    if (!userId || !workout) {
      return res.status(400).json({ error: 'userId and workout are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Make sure user.workouts exists and is an array
    if (!Array.isArray(user.workouts)) {
      user.workouts = [];
    }

    // Push workout object to user.workouts array
    user.workouts.push(workout);

    await user.save();

    return res.status(200).json({ message: 'Workout assigned successfully!' });
  } catch (err) {
    console.error('Error assigning workout:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
