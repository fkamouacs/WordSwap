const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    gamesWon: {
        type: Number,
        default: 0
    },
    inGame:{
        type: Boolean,
        default: false
    },
    socketId: {
        type: String,
        default: ""
    },
    gameSessionId: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('player', playerSchema);