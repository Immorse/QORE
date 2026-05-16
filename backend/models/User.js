const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
    unique: true
  },

  displayName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  bio: {
    type: String,
    default: ""
  },

  avatar: {
    type: String,
    default: ""
  },

  totalQuestions: {
    type: Number,
    default: 0
  },

  physicsQuestions: {
    type: Number,
    default: 0
  },

  chemistryQuestions: {
    type: Number,
    default: 0
  },

  mathsQuestions: {
    type: Number,
    default: 0
  },

  streak: {
    type: Number,
    default: 0
  },

  weeklyQuestions: {
    type: Number,
    default: 0
  },

  tier: {
    type: String,
    default: "Bronze"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("User", userSchema);