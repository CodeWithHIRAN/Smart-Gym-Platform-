// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =====================================
   MIDDLEWARE
===================================== */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

/* =====================================
   DATABASE
===================================== */
mongoose
  .connect(
    "mongodb://localhost:27017/gymdb"
  )
  .then(() =>
    console.log(
      "✅ MongoDB connected"
    )
  )
  .catch((err) =>
    console.error(
      "❌ MongoDB connection error:",
      err
    )
  );

/* =====================================
   IMPORT ROUTES
===================================== */
const authRoutes = require(
  "./routes/authRoutes"
);

const userRoutes = require(
  "./routes/userRoutes"
);

const workoutRoutes = require(
  "./routes/workoutRoutes"
);

/* IMPORTANT FIX */
const liveSessionRoutes = require(
  "./routes/liveSessionRoutes"
);

/* =====================================
   USE ROUTES
===================================== */
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/workouts",
  workoutRoutes
);

/* IMPORTANT FIX */
app.use(
  "/api/live-sessions",
  liveSessionRoutes
);

/* =====================================
   HOME
===================================== */
app.get("/", (req, res) => {
  res.send(
    "Smart Online Gym API running..."
  );
});

/* =====================================
   SERVER START
===================================== */
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `🚀 Server started on port ${PORT}`
  )
);