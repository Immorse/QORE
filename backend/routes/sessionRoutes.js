const express = require("express");

const router = express.Router();

const Session =
  require("../models/Session");

const jwt = require("jsonwebtoken");

/* =========================
   AUTH MIDDLEWARE
========================= */

const protect = (req, res, next) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      message: "No token"
    });

  }

  const token =
    authHeader.split(" ")[1];

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.userId = decoded.id;

    next();

  }

  catch {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};

/* =========================
   CREATE SESSION
========================= */

router.post(
  "/create",
  protect,
  async (req, res) => {

    try {

      const {
        subject,
        questionsSolved,
        notes
      } = req.body;

      const session =
        await Session.create({

          userId: req.userId,

          subject,

          questionsSolved,

          notes

        });

      res.status(201).json(session);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error"
      });

    }

  }
);

/* =========================
   GET USER SESSIONS
========================= */

router.get(
  "/my-sessions",
  protect,
  async (req, res) => {

    try {

      const sessions =
        await Session.find({

          userId: req.userId

        }).sort({
          createdAt: -1
        });

      res.json(sessions);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error"
      });

    }

  }
);

module.exports = router;