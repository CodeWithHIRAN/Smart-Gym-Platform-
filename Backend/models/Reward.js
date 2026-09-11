// Reward.js - Boilerplate
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  lastClaimed: { type: String }, // Format: YYYY-MM-DD
});

module.exports = mongoose.model('Reward', rewardSchema);
