// controllers/liveSessionController.js

const LiveSession = require("../models/LiveSession");

/* =====================================================
   BOOK SESSION
===================================================== */
exports.bookSession = async (req, res) => {
  try {
    const {
      userId,
      userName,
      trainerId,
      trainerName,
      date,
      time,
      meetingLink,
      notes,
    } = req.body;

    if (
      !userId ||
      !userName ||
      !trainerId ||
      !trainerName ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        error: "All required fields must be provided",
      });
    }

    const existing = await LiveSession.findOne({
      trainerId,
      date,
      time,
      status: {
        $nin: ["Cancelled", "Rejected"],
      },
    });

    if (existing) {
      return res.status(400).json({
        error: "This slot is already booked",
      });
    }

    const session = await LiveSession.create({
      userId,
      userName,
      trainerId,
      trainerName,
      date,
      time,
      meetingLink: meetingLink || "",
      notes: notes || "",
      status: "Booked",
    });

    return res.status(201).json({
      message: "Session booked successfully",
      session,
    });
  } catch (err) {
    console.error("Book Session Error:", err);

    return res.status(500).json({
      error: "Failed to book session",
    });
  }
};

/* =====================================================
   GET USER BOOKINGS
===================================================== */
exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await LiveSession.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(sessions);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to fetch user sessions",
    });
  }
};

/* =====================================================
   GET TRAINER BOOKINGS
===================================================== */
exports.getTrainerSessions = async (req, res) => {
  try {
    const sessions = await LiveSession.find({
      trainerId: req.params.trainerId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(sessions);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to fetch trainer sessions",
    });
  }
};

/* =====================================================
   GET ALL BOOKINGS
===================================================== */
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await LiveSession.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch sessions",
    });
  }
};

/* =====================================================
   UPDATE / RESCHEDULE SESSION
===================================================== */
exports.updateSession = async (req, res) => {
  try {
    const { date, time, status, meetingLink, notes } =
      req.body;

    const session = await LiveSession.findById(
      req.params.id
    );

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    /* SLOT CONFLICT CHECK */
    if (date && time) {
      const clash = await LiveSession.findOne({
        _id: { $ne: req.params.id },
        trainerId: session.trainerId,
        date,
        time,
        status: {
          $nin: ["Cancelled", "Rejected"],
        },
      });

      if (clash) {
        return res.status(400).json({
          error: "Selected slot already booked",
        });
      }

      session.date = date;
      session.time = time;
      session.status = "Rescheduled";
    }

    if (status) session.status = status;

    if (meetingLink)
      session.meetingLink = meetingLink;

    if (notes !== undefined)
      session.notes = notes;

    await session.save();

    return res.status(200).json({
      message: "Session updated successfully",
      session,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to update session",
    });
  }
};

/* =====================================================
   ACCEPT SESSION
===================================================== */
exports.acceptSession = async (req, res) => {
  try {
    const session =
      await LiveSession.findByIdAndUpdate(
        req.params.id,
        { status: "Accepted" },
        { new: true }
      );

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    return res.status(200).json({
      message: "Booking accepted",
      session,
    });
  } catch {
    return res.status(500).json({
      error: "Failed to accept booking",
    });
  }
};

/* =====================================================
   REJECT SESSION
===================================================== */
exports.rejectSession = async (req, res) => {
  try {
    const session =
      await LiveSession.findByIdAndUpdate(
        req.params.id,
        { status: "Rejected" },
        { new: true }
      );

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    return res.status(200).json({
      message: "Booking rejected",
      session,
    });
  } catch {
    return res.status(500).json({
      error: "Failed to reject booking",
    });
  }
};

/* =====================================================
   COMPLETE SESSION
===================================================== */
exports.completeSession = async (req, res) => {
  try {
    const session =
      await LiveSession.findByIdAndUpdate(
        req.params.id,
        { status: "Completed" },
        { new: true }
      );

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    return res.status(200).json({
      message: "Session marked completed",
      session,
    });
  } catch {
    return res.status(500).json({
      error: "Failed to complete session",
    });
  }
};

/* =====================================================
   CANCEL SESSION
===================================================== */
exports.cancelSession = async (req, res) => {
  try {
    const session =
      await LiveSession.findByIdAndUpdate(
        req.params.id,
        { status: "Cancelled" },
        { new: true }
      );

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    return res.status(200).json({
      message: "Session cancelled",
      session,
    });
  } catch {
    return res.status(500).json({
      error: "Failed to cancel session",
    });
  }
};

/* =====================================================
   DELETE SESSION (OPTIONAL HARD DELETE)
===================================================== */
exports.deleteSession = async (req, res) => {
  try {
    const session =
      await LiveSession.findByIdAndDelete(
        req.params.id
      );

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    return res.status(200).json({
      message: "Session deleted permanently",
    });
  } catch {
    return res.status(500).json({
      error: "Failed to delete session",
    });
  }
};