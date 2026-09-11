const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');
const moment = require('moment');

// GET daily reward status
router.get('/daily/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let reward = await Reward.findOne({ userId });

    const today = moment().format('YYYY-MM-DD');
    const claimedToday = reward?.lastClaimed === today;

    res.json({
      points: reward?.points || 0,
      claimedToday,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch daily reward' });
  }
});

// POST claim daily reward
router.post('/claim/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let reward = await Reward.findOne({ userId });
    const today = moment().format('YYYY-MM-DD');

    if (reward && reward.lastClaimed === today) {
      return res.status(400).json({ message: 'Already claimed today' });
    }

    if (!reward) {
      reward = new Reward({ userId, points: 0, lastClaimed: null });
    }

    reward.points += 10; // daily reward points
    reward.lastClaimed = today;
    await reward.save();

    res.json({ points: reward.points });
  } catch (err) {
    res.status(500).json({ error: 'Failed to claim reward' });
  }
});

module.exports = router;
