const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* =========================
   SIGNUP
========================= */

exports.signup = async (req, res) => {
console.log("SIGNUP ROUTE HIT");
console.log(req.body);
  try {

    const {
      displayName,
      email,
      password
    } = req.body;

    /* CHECK EXISTING USER */

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    /* HASH PASSWORD */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* GENERATE USER ID */

    const userId =
      "QORE_" +
      Math.random().toString(36).substring(2, 10);

    /* CREATE USER */

    const newUser = new User({

      userId,

      displayName,

      email,

      password: hashedPassword

    });

    await newUser.save();

    /* JWT TOKEN */

    const token = jwt.sign(

      {
        id: newUser._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "30d"
      }

    );

    res.status(201).json({

      token,

      user: {

        userId: newUser.userId,

        displayName: newUser.displayName,

        email: newUser.email

      }

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

/* =========================
   LOGIN
========================= */

exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    /* FIND USER */

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    /* VERIFY PASSWORD */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    /* GENERATE TOKEN */

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "30d"
      }

    );

    res.status(200).json({

      token,

      user: {

        userId: user.userId,

        displayName: user.displayName,

        email: user.email

      }

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};