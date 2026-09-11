const express = require("express");
const router = express.Router();

const {
  bookSession,
  getUserSessions,
  getTrainerSessions,
  getAllSessions,
  updateSession,
  acceptSession,
  rejectSession,
  completeSession,
  cancelSession,
  deleteSession
} = require("../controllers/liveSessionController");

router.post("/book", bookSession);

router.get("/user/:userId", getUserSessions);

router.get("/trainer/:trainerId", getTrainerSessions);

router.get("/", getAllSessions);

router.put("/:id", updateSession);

router.put("/accept/:id", acceptSession);

router.put("/reject/:id", rejectSession);

router.put("/complete/:id", completeSession);

router.delete("/:id", cancelSession);

// optional hard delete
router.delete("/remove/:id", deleteSession);

module.exports = router;