const express = require("express");

const router = express.Router();

const Session =
  require("../models/Session");

const User =
  require("../models/User");

/* =========================
   GET LEADERBOARD
========================= */

router.get(
  "/jee",
  async (req, res) => {

    try {

      /* GET ALL USERS */

      const users =
        await User.find();

      const leaderboard =
        [];

      /* LOOP USERS */

      for (const user of users) {

        const sessions =
          await Session.find({

            userId: user._id

          });

        /* TOTAL QUESTIONS */

        let totalQuestions = 0;

        sessions.forEach((session) => {

          totalQuestions +=
            Number(
              session.questionsSolved
            );

        });

        /* SIMPLE STREAK */

        const streak =
          Math.min(
            sessions.length,
            30
          );

        /* TIER */

        let tier =
          "Bronze";

        if (totalQuestions >= 1000) {

          tier = "Silver";

        }

        if (totalQuestions >= 3000) {

          tier = "Gold";

        }

        if (totalQuestions >= 6000) {

          tier = "Diamond";

        }

        if (totalQuestions >= 10000) {

          tier = "Legend";

        }

        leaderboard.push({

          displayName:
            user.displayName,

          totalQuestions,

          streak,

          tier

        });

      }

      /* SORT */

      leaderboard.sort(

        (a, b) =>

          b.totalQuestions -
          a.totalQuestions

      );

      res.json(
        leaderboard
      );

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }
);

module.exports = router;