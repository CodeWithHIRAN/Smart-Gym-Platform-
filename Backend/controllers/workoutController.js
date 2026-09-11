const Workout = require('../models/Workout');

exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

exports.addWorkout = async (req, res) => {
  try {
    const { title, category, level, duration, videoUrl } = req.body;
    const newWorkout = new Workout({ title, category, level, duration, videoUrl });
    await newWorkout.save();
    res.status(201).json({ message: 'Workout added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add workout' });
  }
};