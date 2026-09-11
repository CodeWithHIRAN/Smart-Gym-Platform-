// routes/liveSessionRoutes.js

const express = require("express");
const router = express.Router();
const LiveSession = require("../models/LiveSession");

/* =====================================================
   BOOK SESSION
   POST /api/live-sessions/book
===================================================== */
router.post("/book", async (req, res) => {
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
        error: "All fields are required",
      });
    }

    const alreadyBooked =
      await LiveSession.findOne({
        trainerId,
        date,
        time,
        status: {
          $nin: [
            "Cancelled",
            "Rejected",
          ],
        },
      });

    if (alreadyBooked) {
      return res.status(400).json({
        error:
          "Trainer already booked for this time slot",
      });
    }

    const session =
      await LiveSession.create({
        userId,
        userName,
        trainerId,
        trainerName,
        date,
        time,
        meetingLink:
          meetingLink || "",
        notes: notes || "",
        status: "Booked",
      });

    return res.status(201).json({
      message:
        "Session booked successfully",
      session,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error:
        "Failed to book session",
    });
  }
});

/* =====================================================
   USER BOOKINGS
   GET /api/live-sessions/user/:userId
===================================================== */
router.get(
  "/user/:userId",
  async (req, res) => {
    try {
      const sessions =
        await LiveSession.find({
          userId:
            req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(sessions);
    } catch (err) {
      res.status(500).json({
        error:
          "Failed to fetch sessions",
      });
    }
  }
);

/* =====================================================
   TRAINER BOOKINGS
   GET /api/live-sessions/trainer/:trainerId
===================================================== */
router.get(
  "/trainer/:trainerId",
  async (req, res) => {
    try {
      const sessions =
        await LiveSession.find({
          trainerId:
            req.params
              .trainerId,
        }).sort({
          createdAt: -1,
        });

      res.json(sessions);
    } catch (err) {
      res.status(500).json({
        error:
          "Failed to fetch trainer sessions",
      });
    }
  }
);

/* =====================================================
   UPDATE SESSION
   PUT /api/live-sessions/:id
===================================================== */
router.put(
  "/:id",
  async (req, res) => {
    try {
      const {
        date,
        time,
        status,
        meetingLink,
        notes,
      } = req.body;

      const session =
        await LiveSession.findById(
          req.params.id
        );

      if (!session) {
        return res
          .status(404)
          .json({
            error:
              "Session not found",
          });
      }

      /* check clash */
      if (date && time) {
        const clash =
          await LiveSession.findOne(
            {
              _id: {
                $ne:
                  req.params.id,
              },
              trainerId:
                session.trainerId,
              date,
              time,
              status: {
                $nin: [
                  "Cancelled",
                  "Rejected",
                ],
              },
            }
          );

        if (clash) {
          return res
            .status(400)
            .json({
              error:
                "This slot already booked",
            });
        }

        session.date = date;
        session.time = time;
      }

      if (status)
        session.status =
          status;

      if (meetingLink)
        session.meetingLink =
          meetingLink;

      if (notes !==
        undefined)
        session.notes =
          notes;

      await session.save();

      res.json({
        message:
          "Session updated successfully",
        session,
      });
    } catch (err) {
      res.status(500).json({
        error:
          "Update failed",
      });
    }
  }
);

/* =====================================================
   ACCEPT BOOKING
   PUT /api/live-sessions/accept/:id
===================================================== */
router.put(
  "/accept/:id",
  async (req, res) => {
    try {
      const session =
        await LiveSession.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "Accepted",
          },
          {
            new: true,
          }
        );

      res.json({
        message:
          "Booking accepted",
        session,
      });
    } catch {
      res.status(500).json({
        error:
          "Failed",
      });
    }
  }
);

/* =====================================================
   REJECT BOOKING
   PUT /api/live-sessions/reject/:id
===================================================== */
router.put(
  "/reject/:id",
  async (req, res) => {
    try {
      const session =
        await LiveSession.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "Rejected",
          },
          {
            new: true,
          }
        );

      res.json({
        message:
          "Booking rejected",
        session,
      });
    } catch {
      res.status(500).json({
        error:
          "Failed",
      });
    }
  }
);

/* =====================================================
   COMPLETE SESSION
   PUT /api/live-sessions/complete/:id
===================================================== */
router.put(
  "/complete/:id",
  async (req, res) => {
    try {
      const session =
        await LiveSession.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "Completed",
          },
          {
            new: true,
          }
        );

      res.json({
        message:
          "Session completed",
        session,
      });
    } catch {
      res.status(500).json({
        error:
          "Failed",
      });
    }
  }
);

/* =====================================================
   CANCEL SESSION
   DELETE /api/live-sessions/:id
===================================================== */
router.delete(
  "/:id",
  async (req, res) => {
    try {
      const session =
        await LiveSession.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "Cancelled",
          },
          {
            new: true,
          }
        );

      res.json({
        message:
          "Session cancelled",
        session,
      });
    } catch {
      res.status(500).json({
        error:
          "Failed to cancel",
      });
    }
  }
);

/* =====================================================
   ALL BOOKINGS (ADMIN OPTIONAL)
   GET /api/live-sessions
===================================================== */
router.get(
  "/",
  async (req, res) => {
    try {
      const sessions =
        await LiveSession.find().sort(
          {
            createdAt: -1,
          }
        );

      res.json(sessions);
    } catch {
      res.status(500).json({
        error:
          "Failed to fetch all sessions",
      });
    }
  }
);

module.exports = router;