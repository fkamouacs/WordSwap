// models/Game.js

const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  user1: {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    wordChoice: {
      type: String,
      required: true,
    },
  },
  user2: {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    wordChoice: {
      type: String,
      required: true,
    },
  },
  steps: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
      action: {
        type: String,
        enum: ["guess", "pick-word", "interupt", "end", "start"],
        require: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  winner: {
    type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
  }
});

module.exports = mongoose.model("Game", gameSchema);
