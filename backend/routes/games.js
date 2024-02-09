// routes/games.js

const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Start a new game
router.post('/', async (req, res) => {
    // ... implementation to start a new game
    const init = {
        user1: req.body.player1,
        user2: req.body.player2
    }

    const newGame = new Game(init);
    await newGame.save();
    res.send(newGame._id)
});

// Make a guess in a game
router.post('/:gameId/guess', async (req, res) => {
    // ... implementation for making a guess
    
});

// Get game status
router.get('/:gameId', async (req, res) => {
    // ... implementation to get current game status
});

module.exports = router;
