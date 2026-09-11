// userController.js - Boilerplate
// In user controller
exports.getWorkoutsByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('assignedWorkouts').populate('assignedWorkouts');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.assignedWorkouts || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
