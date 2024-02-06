// Import necessary modules
const express = require('express');  // Importing Express framework
const mongoose = require('mongoose');  // Importing Mongoose for MongoDB interactions
const cors = require('cors');  // Importing CORS to allow cross-origin requests
require('dotenv').config();  // Importing and configuring dotenv to load environment variables

// Initialize express app
const app = express(); // Creating an instance of Express

// Import route handlers
const playerRoutes = require('./routes/players'); // Routes for players-related operations
const gameRoutes = require('./routes/games'); // // Routes for games-related operations

// Middleware
app.use(cors()); // Using CORS middleware for handling cross-origin requests
app.use(express.json()); // Using built-in middleware for parsing JSON

// Route handlers
app.use('/api/players', playerRoutes); // Use player routes for requests to '/api/players'
app.use('/api/games', gameRoutes); // Use game routes for requests to '/api/games'

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected")) // Logging on successful connection
    .catch(err => console.log(err)); // Logging errors if connection fails

// Set the port
const PORT = process.env.PORT || 5000; // Setting the port number from environment variable or defaulting to 5000

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Logging the port number on which the server is running
});
