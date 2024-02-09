// routes/players.js

const express = require('express');
const Player = require('../models/player');
const router = express.Router();

// Create a new player
router.post('/', async (req, res) => {
    // ... implementation to add a new player
});

// Get player statistics
router.get('/:username/stats', async (req, res) => {
    // ... implementation to get player stats
});

// Get username by id
router.get('/:id/username', async (req,res) => {
    const player = await Player.findOne({_id: req.params.id })
    res.send(player.username);

})


module.exports = router;
