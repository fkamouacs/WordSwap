// models/Game.js

const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  user1: {
    player: {
      type: mongoose.Schema.Types.ObjectId,
    },
    wordChoice: {
      type: String,
    },
  },
  user2: {
    player: {
      type: mongoose.Schema.Types.ObjectId,
    },
    wordChoice: {
      type: String,
    },
  },
  ended:{
    type: Boolean,
    default: false
  },timestamp: {
    type: Date,
    default: Date.now,
  },winner: {
    type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
  },
  guesses:{
    type: Number
  },

  endTime: Date
});

module.exports = mongoose.model("game", gameSchema);
