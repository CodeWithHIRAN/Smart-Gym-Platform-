// models/LiveSession.js

const mongoose = require("mongoose");

const liveSessionSchema = new mongoose.Schema(
{
  /* ==========================
     USER DETAILS
  ========================== */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userName: {
    type: String,
    required: true,
    trim: true
  },

  /* ==========================
     TRAINER DETAILS
  ========================== */
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  trainerName: {
    type: String,
    required: true,
    trim: true
  },

  /* ==========================
     SESSION DATE & TIME
  ========================== */
  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  /* ==========================
     ONLINE MEETING LINK
  ========================== */
  meetingLink: {
    type: String,
    default: ""
  },

  /* ==========================
     SESSION STATUS
  ========================== */
  status: {
    type: String,
    enum: [
      "Booked",
      "Pending",
      "Accepted",
      "Rejected",
      "Rescheduled",
      "Cancelled",
      "Completed"
    ],
    default: "Booked"
  },

  /* ==========================
     OPTIONAL NOTES
  ========================== */
  notes: {
    type: String,
    default: ""
  },

  /* ==========================
     PAYMENT (OPTIONAL FUTURE)
  ========================== */
  paymentStatus: {
    type: String,
    enum: [
      "Unpaid",
      "Paid",
      "Refunded"
    ],
    default: "Unpaid"
  }

},
{
  timestamps: true
});

/* Prevent same trainer same slot double booking */
liveSessionSchema.index(
  {
    trainerId: 1,
    date: 1,
    time: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model(
  "LiveSession",
  liveSessionSchema
);