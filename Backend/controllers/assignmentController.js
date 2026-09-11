const User = require('../models/User');

exports.assignWorkout = async (req, res) => {
  try {
    const { userId, workout } = req.body;
    if (!userId || !workout) {
      return res.status(400).json({ error: 'userId and workout required' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.workouts.push(workout);
    await user.save();

    res.json({ message: 'Workout assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getWorkoutsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('workouts');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
