const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Route to assign a workout to a user
router.post('/assign', assignmentController.assignWorkout);

// Route to get all workouts assigned to a specific user by userId
router.get('/user/:userId', assignmentController.getWorkoutsByUserId);

module.exports = router;
