// Import necessary modules
const { startOrJoinGame } = require('./controller/gameController'); // Import the function
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
app.use(cors({
    origin: 'http://localhost:3000', // Allow only the frontend origin to access the server
    methods: ['GET', 'POST'] // Adjust methods as per your requirements
  }));
app.use(express.json()); // Using built-in middleware for parsing JSON

// Import route handlers
const playerRoutes = require('./routes/players'); // Routes for players-related operations
const gameRoutes = require('./routes/games'); // Routes for games-related operations

// Route handlers
app.use('/api/players', playerRoutes); // Use player routes for requests to '/api/players'
app.use('/api/games', gameRoutes); // Use game routes for requests to '/api/games'

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/wordGuessDueIDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Array to keep track of waiting players
let waitingPlayers = [];

// async function makeGame(player1, word1, player2, word2){
//     try{const newGame = new Game({
//             user1 : {
//                 player : player1,
//                 wordChoice: word1
//             },
//             user2 : {
//                 player : player2,
//                 wordChoice: word2
//             },
//             guesses : [],
//             status : 'in-progress',
//             startTime : Date.now
//         })

//         const saveGame = await newGame.save();
//         console.log("New game instance created : ",saveGame)
//         return saveGame;
//     } catch (error){
//         console.log("Error when creating a new game : ",error)
//         throw error;
//     }
// }

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('New client connected at : ' + socket.id);

    // Handle Socket.IO events here

    // Joining a room
    socket.on('start or join game', ({ playerId, gameId }) => {
        startOrJoinGame(playerId, gameId); // Call the function
    });

    // Leaving a room
    socket.on('leave game', (gameId) => {
        socket.leave(gameId);
    });

    // Player wants to find a game
    socket.on('find game', () => {
        waitingPlayers.push(socket.id);

        if (waitingPlayers.length >= 2) {
            const gameId = createNewGameId(); // Create a unique game ID
            waitingPlayers.forEach(playerSocketId => {
                io.to(playerSocketId).join(gameId);
            });
            startGame(gameId); // Start game with countdown
            waitingPlayers = []; // Clear waiting players
        }
    });

    // Player cancels finding game
    socket.on('cancel find game', () => {
        waitingPlayers = waitingPlayers.filter(playerSocketId => playerSocketId !== socket.id);
    });

    // Listen for chat messages
    socket.on('send chat message', (data) => {
        // 'data' contains details of the message and the game
        // Broadcast message to the other player in the same game
        io.emit('receive chat message', data);
        // console.log("received" + data.message);
        // console.log("gameId" + data.gameId);

    });

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

// Function to start game with countdown
function startGame(gameId) {
    let countdown = 10; // example 10-second countdown
    const intervalId = setInterval(() => {
        io.to(gameId).emit('game starting', countdown);
        countdown--;
        if (countdown < 0) {
            clearInterval(intervalId);
            // Additional logic to officially start the game
        }
    }, 1000);
}

// Set the port
const PORT = 5000; // Setting the port number from environment variable or defaulting to 5000

// Start the HTTP server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
