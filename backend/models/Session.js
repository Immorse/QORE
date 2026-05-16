const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  questionsSolved: {
    type: Number,
    required: true
  },

  notes: {
    type: String,
    default: ""
  }

},
{
  timestamps: true
});

module.exports =
  mongoose.model(
    "Session",
    sessionSchema
  );