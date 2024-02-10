// routes/players.js

const express = require('express');
const uuid = require("uuid");
const Player = require('../models/player');
const router = express.Router();

// Create a new player
router.post('/', async (req, res) => {
    // Function to generate a unique player name
    const generateRandomName = () => {
        const spiceAdjectives = ["Cinnamon", "Cardamom", "Clove", "Ginger", "Saffron", "Nutmeg",];
        const herbNouns = ["Basil", "Rosemary", "Thyme", "Sage", "Mint", "Coriander",];
        const spiceAdjective =
        spiceAdjectives[Math.floor(Math.random() * spiceAdjectives.length)];
        const herbNoun = herbNouns[Math.floor(Math.random() * herbNouns.length)];
        return `${spiceAdjective}${herbNoun}`;
    };

    playerName = generateRandomName();
    console.log(playerName + "...");

    // Create a new Player using the Player model
    await new Player({
        username: playerName,
        socketId: uuid.v4(), // Use uuid for generating socketId
    }).save();

    res.json({ playerName });
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
