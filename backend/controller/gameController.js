const Game = require("../models/game"); // Import your Game model
const Player = require("../models/player"); // Import your Player model

// This is a very simplified version of the function
async function startOrJoinGame(playerId, gameId) {
  try {
    let game;

    if (gameId) {
      // Join an existing game
      game = await Game.findById(gameId);
      if (!game) {
        throw new Error("Game not found");
      }
      if (game.players.length >= 2) {
        throw new Error("Game is full");
      }
      game.players.push(playerId);
    } else {
      // Start a new game
      game = new Game({ players: [playerId] });
    }

    await game.save();

    // Fetch opponent details
    const opponentId = game.players.find((id) => id.toString() !== playerId);
    const opponent = opponentId ? await Player.findById(opponentId) : null;

    // Assuming 'io' is your Socket.IO server instance
    io.to(playerId).emit("game details", {
      gameId: game._id,
      opponent: opponent
        ? { id: opponent._id, username: opponent.username }
        : null,
    });

    if (opponent) {
      io.to(opponentId).emit("game details", {
        gameId: game._id,
        opponent: { id: playerId }, // Add more player details as needed
      });
    }
  } catch (error) {
    console.error("startOrJoinGame error:", error);
    // Handle errors, possibly emitting an event back to the client
  }
}

async function getAllGames(io) {
  const all = await Game.find({});
  io.emit("init games", all);
}

module.exports = {
  startOrJoinGame,
  getAllGames,
};
