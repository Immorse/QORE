require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/* ROUTES */

const authRoutes =
  require("./routes/authRoutes");

const sessionRoutes =
  require("./routes/sessionRoutes");

const leaderboardRoutes =
  require("./routes/leaderboardRoutes");
/* APP */

const app = express();


/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   REQUEST LOGGER
========================= */

app.use((req, res, next) => {

  console.log(
    `${req.method} ${req.url}`
  );

  next();

});

/* =========================
   ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/sessions",
  sessionRoutes
);

app.use(
  "/api/leaderboard",
  leaderboardRoutes
);

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {

  res.send(
    "QORE Backend Running"
  );

});

/* =========================
   MONGODB CONNECTION
========================= */

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((error) => {

  console.log(error);

});

/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});