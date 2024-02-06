// models/Game.js

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    wordToGuess: {
        type: String,
        required: true
    },
    guesses: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
        guess: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'abandoned'],
        default: 'in-progress'
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    startTime: Date,
    endTime: Date
});

module.exports = mongoose.model('Game', gameSchema);
