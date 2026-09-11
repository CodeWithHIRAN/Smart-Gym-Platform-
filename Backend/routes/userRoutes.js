const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users, with optional role filter
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    let users;

    if (role) {
      users = await User.find({ role: role });  // <-- filter by role
    } else {
      users = await User.find();
    }

    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Assign workout to a user
router.post('/assign-workout', async (req, res) => {
  try {
    const { userId, workout } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.workouts = user.workouts || [];
    user.workouts.push(workout);
    await user.save();

    res.json({ message: 'Workout assigned successfully' });
  } catch (err) {
    console.error('Assignment error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get assigned workouts for a user
router.get('/:userId/workouts', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const workouts = user.workouts || [];
    res.json(workouts);
  } catch (err) {
    console.error('Error fetching workouts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a todo to user
router.post('/:userId/todos', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo text is required' });
    }
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const todo = { text: text.trim(), completed: false, createdAt: new Date() };
    user.todos = user.todos || [];
    user.todos.push(todo);
    await user.save();

    res.json(user.todos[user.todos.length - 1]);
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).json({ error: 'Failed to add todo.' });
  }
});

// Get todos for a user
router.get('/:userId/todos', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const todos = user.todos || [];
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Failed to fetch todos.' });
  }
});

// Toggle todo completion status
router.patch('/:userId/todos/:todoId', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const todo = user.todos.id(todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.completed = !todo.completed;
    await user.save();

    res.json(todo);
  } catch (err) {
    console.error('Error toggling todo:', err);
    res.status(500).json({ error: 'Failed to update todo.' });
  }
});

module.exports = router;
