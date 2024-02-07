// Import necessary modules
const express = require('express');  // Importing Express framework
const http = require('http'); // Required for creating HTTP server
const socketIo = require('socket.io')// Importing Socket.IO
const mongoose = require('mongoose');  // Importing Mongoose for MongoDB interactions
const cors = require('cors');  // Importing CORS to allow cross-origin requests
require('dotenv').config();  // Importing and configuring dotenv to load environment variables

// Initialize express app
const app = express(); // Creating an instance of Express

// Create HTTP server and integrate it with Express app
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the HTTP server
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:1313",
      methods: ["GET", "POST"]
    }
  })

// Middleware
app.use(cors()); // Using CORS middleware for handling cross-origin requests
app.use(express.json()); // Using built-in middleware for parsing JSON

// Import route handlers
const playerRoutes = require('./routes/players'); // Routes for players-related operations
const gameRoutes = require('./routes/games'); // // Routes for games-related operations

// Route handlers
app.use('/api/players', playerRoutes); // Use player routes for requests to '/api/players'
app.use('/api/games', gameRoutes); // Use game routes for requests to '/api/games'

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/wordGuessDueIDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('New client connected at : ' + socket.id);
    
    // Handle Socket.IO events here
    // Example: socket.on('event_name', callback);

    socket.emit("connected", "You've connected to the server");

    socket.emit("in-game-server-message", "in game message")

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    
    // Joining a room
    socket.on('join-game', (gameId) => {
        socket.join(gameId);
    });

    // Leaving a room
    socket.on('leave game', (gameId) => {
        socket.leave(gameId);
    });

    // Listen for chat messages
    socket.on('send chat message', (data) => {
        // 'data' contains details of the message and the game
        // Broadcast message to the other player in the same game
        io.to(data.gameId).emit('receive chat message', data);

        // Optionally, save the message to the database
    });

    socket.on("send-message", (message) => {
        console.log(message);
        console.log(socket.rooms);
        // io.to(toUserId).emit("receive-message", message);
    })

    socket.on("input-a-guess", (guess, fromUserId) => {
        console.log(guess);
    })

    socket.on("update-my-choice-of-word", (input) => {
        console.log(input + " from " + socket.id)

    })



});

// Set the port
const PORT = 5000; // Setting the port number from environment variable or defaulting to 5000

// Start the HTTP server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
