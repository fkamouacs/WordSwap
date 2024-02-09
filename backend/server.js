// Import necessary modules
const express = require("express"); // Importing Express framework
const http = require("http"); // Required for creating HTTP server
const socketIo = require("socket.io"); // Importing Socket.IO
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB interactions
const cors = require("cors"); // Importing CORS to allow cross-origin requests
require("dotenv").config(); // Importing and configuring dotenv to load environment variables

const Player = require("./models/player"); // Import the Player model
const Game = require("./models/game"); // Import the Player model
const Word = require("./models/word")

const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const fs = require('fs');
const readline = require('readline');

async function clearDatabase() {
  try {
      await Player.deleteMany({});
      console.log("All players deleted.");

      await Game.deleteMany({});
      console.log("All games deleted.");

  } catch (error) {
      console.error("Error clearing database:", error);
  }
}
clearDatabase();

async function addWordsFromFile(filePath) {
  
  await Word.deleteMany({});
  console.log("All games deleted.");

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const word = new Word({ word: line });
    await word.save();
  }
}

// addWordsFromFile("validWords.txt")


// Initialize express app
const app = express(); // Creating an instance of Express

// Create HTTP server and integrate it with Express app
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(
  cors({
    origin: "*", // Allow only the frontend origin to access the server
    methods: ["GET", "POST"], // Adjust methods as per your requirements
  })
);
app.use(express.json()); // Using built-in middleware for parsing JSON

// Import route handlers
const playerRoutes = require("./routes/players"); // Routes for players-related operations
const gameRoutes = require("./routes/games"); // Routes for games-related operations

// Route handlers
app.use("/api/players", playerRoutes); // Use player routes for requests to '/api/players'
app.use("/api/games", gameRoutes); // Use game routes for requests to '/api/games'



// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {console.log("MongoDB successfully connected");addWordsFromFile("validWords.txt")})
  .catch((err) => console.log(err));

// Function to generate a unique player name
const generateRandomName = () => {
  const spiceAdjectives = [
    "Cinnamon",
    "Cardamom",
    "Clove",
    "Ginger",
    "Saffron",
    "Nutmeg",
  ];
  const herbNouns = ["Basil", "Rosemary", "Thyme", "Sage", "Mint", "Coriander"];
  const spiceAdjective =
    spiceAdjectives[Math.floor(Math.random() * spiceAdjectives.length)];
  const herbNoun = herbNouns[Math.floor(Math.random() * herbNouns.length)];
  return `${spiceAdjective}${herbNoun}`;
};

app.get("/", async (req, res) => {

    playerName = generateRandomName();
    // res.cookie("playerName", playerName, { maxAge: 900000, httpOnly: true });

    // Create a new Player using the Player model
    await Player.create({
      username: playerName,
      socketId: uuid.v4(), // Use uuid for generating socketId
    });

  res.json({ playerName });
});

// Array to keep track of waiting players
let waitingPlayers = [];

async function addStep(gameId, playerId, action){
  /* action = [type] | messsage
      type one of "guess", "pick-word", "interupt", "end", "start"
      if player guess then action = "guess|house"
      if player pick the word then action = "pick-word|house"
      if game start then action = "start|[some message]"
      if the game end then action = "end|[some message]"
      if the game got interupted by server issue then action = "interupt|[some message]"
  */

    const game = await gameRoutes.find({_id:gameId})

    if (!game) {
      throw new Error('Game not found');
    }

    const newStep = {
      player : playerId,
      action : action
    }

    game.steps.push(newStep);

    await game.save();

}

async function makeGame(player1, player2){
    try{const newGame = new Game({
            user1 : {
              player : player1,
              wordChoice : ""
            },
            user2 : {
              player : player2,
              wordChoice : ""
            },
            steps : [],
        })

        const saveGame = await newGame.save();
        console.log("New game instance created : ",saveGame)
        return saveGame;
    } catch (error){
        console.log("Error when creating a new game : ",error)
        throw error;
    }
}

async function updatePlayerStat(playerId, gameResult){
    const player = await Player.find({_id: playerId})

    if(!player){
      throw new Error('Player not found');
    }

    player.gamesPlayed++;
    
    if(gameResult == "win"){
      player.gamesWon++;
    }

    player.ingame = false;

    player.gameSessionId = "";

}

async function findGameByPlayerUsername(username){
  const player = await Player.findOne({username: username})

  if(!player){
    throw new Error('Player not found');
  }

  const game = await Game.findOne({"user1.player":player._id})

  if(!game){
    throw new Error('Game not found');
  }

  return game
}

async function checkWord(guess, answer){
  const word = await Word.findOne({word:guess});

  if(!word){
    return -1
  }

  if(guess == answer){
    return 6
  }

  let output = 0;

  for(let i = 0; i < 5; i++){
    for(let j = 0; j < 5; j++){
      if(guess[i] == answer[j]){
        output++;
        break;
      }
    }
  }

  console.log(output)
  return output;
}

async function handleLose(playerId){
  const player = await Player.findById({_id:playerId})

    player.gamesPlayed++;
    player.inGame = false;
    player.gameSessionId = "";

    await player.save()

}

async function handleWin(playerId){
  const player = await Player.findById({_id:playerId})

  player.gamesPlayed++;
  player.gamesWon++;
  player.inGame = false;
  player.gameSessionId = "";

  await player.save()
}



// Socket.IO connection event
io.on("connection", (socket) => {
  // console.log("New client connected at : " + socket.id);

  // Handle Socket.IO events here

  // Leaving a room
  socket.on("leave game", async (fromUserName) => {
    const gameId = (Array.from(socket.rooms).filter(room => room != socket.id))[0]
    const game = await Game.findById({_id:gameId})
    const player1 = await Player.findById({_id:game.user1.player})
    const player2 = await Player.findById({_id:game.user2.player})

    io.to(gameId).emit("player left", fromUserName)

    if(game.ended){
      return 
    }

    if(player1.username == fromUserName){
      //handle lost for player 1
      await handleLose(player1._id)
      await handleWin(player2._id)
      game.winner = player2._id;
    }else{
      //handle lost for player 2
      await handleLose(player2._id)
      await handleWin(player1._id)
      game.winner = player1._id;
    }
    game.ended = true;
    await game.save()

  });

  // Player wants to find a game

  socket.on("find game", async (username) => {
    if(waitingPlayers.includes(username)){
      return
    }
    waitingPlayers.push(username);

    const player = await Player.findOne({username:username})
    player.socketId = socket.id;
    await player.save()
    
    if (waitingPlayers.length >= 2) {

      const twoPlayerUsername = [waitingPlayers.pop(),waitingPlayers.pop()]

      const player1 = await Player.findOne({username:twoPlayerUsername[0]})
      const player2 = await Player.findOne({username:twoPlayerUsername[1]})



      const game = await makeGame(player1, player2); // Create a unique game ID

      player1.gameSessionId = game._id;
      player2.gameSessionId = game._id;

      await player1.save()
      await player2.save()

      io.sockets.sockets.get(player1.socketId).join(game._id);
      io.sockets.sockets.get(player2.socketId).join(game._id);

      console.log("game created")
      io.to(game._id).emit("game created successfully", game._id);

      io.to(player1.socketId).emit("opponent info",player2.username)
      io.to(player2.socketId).emit("opponent info",player1.username)

      startGame(io,game._id); // Start game with countdown

    }
  });

  socket.on("set word", async (wordChoice, username) => {

    const word = await Word.findOne({word:wordChoice});

    if(!word){
      socket.emit("not a valid word")
      return -1
    }else{
      socket.emit("valid word")
    }


    const gameId = (Array.from(socket.rooms).filter(room => room != socket.id))[0]

    const game = await Game.findById({_id:gameId})

    const player1 = await Player.findById({_id:game.user1.player})
    const player2 = await Player.findById({_id:game.user2.player})

    if(player1.username == username){
      
      await Game.updateOne({ _id: gameId }, { $set: { 'user1.wordChoice': wordChoice } });
    }else if(player2.username == username){
      await Game.updateOne({ _id: gameId }, { $set: { 'user2.wordChoice': wordChoice } });
    }else{
      console.log("user not in this game")
    }


    const newGame = await Game.findById({_id:gameId});

    if(newGame.user1.wordChoice != "" && newGame.user2.wordChoice != ""){

      io.to(gameId).emit("guessing begin", player1.username);
    }

  })

  // Player cancels finding game
  socket.on("cancel find game", () => {
    waitingPlayers = waitingPlayers.filter(
      (playerSocketId) => playerSocketId !== socket.id
    );
  });

  // Listen for chat messages
  socket.on("send chat message", (data) => {
    // 'data' contains details of the message and the game
    // Broadcast message to the other player in the same game
    io.emit("receive chat message", data);
    // console.log("received" + data.message);
    // console.log("gameId" + data.gameId);
  });

  socket.emit("connected", "You've connected to the server");

  socket.emit("in-game-server-message", "in game message");

  socket.on("disconnect", () => {
    // console.log("Client disconnected");
  });


  // Leaving a room
  socket.on("leave game", (gameId) => {
    socket.leave(gameId);
  });


  // // Listen for chat messages
  // socket.on("send chat message", (data) => {
  //   // 'data' contains details of the message and the game
  //   // Broadcast message to the other player in the same game
  //   io.to(data.gameId).emit("receive chat message", data);

  //   // Optionally, save the message to the database
  // });

  socket.on("send-message", async (message,fromUserName) => {
    const gameId = (Array.from(socket.rooms).filter(room => room != socket.id))[0]
    // const game = await Game.findById({_id:gameId})
    io.emit("receive-message", `${fromUserName} : ${message}`);
  });

  socket.on("input-a-guess", async (guess, fromUserName) => {
    console.log(fromUserName, " took a guess ", guess);
    const gameId = (Array.from(socket.rooms).filter(room => room != socket.id))[0]
    const game = await Game.findById({_id:gameId})
    console.log(game)
    // get the word from the user
    let player = await Player.findById({_id:game.user1.player});
    let answer = game.user2.wordChoice
    if(player.username != fromUserName){
      player = await Player.findById({_id:game.user2.player});
      answer = game.user1.wordChoice
    }


    console.log(guess, answer)
    const result = await checkWord(guess,answer)
    console.log(result)

    if(result == -1){
      socket.emit("not a valid word")
    }else if(result == 6){
      socket.emit("guess result", guess, 6)
      io.to(gameId).emit("game finished", fromUserName)
    }else{
      socket.emit("guess result", guess, result)
      io.to(gameId).emit("change turn")
    }
    
  });

  socket.on("update-my-choice-of-word", (input) => {
    console.log(input + " from " + socket.id);
  });

  socket.on("init games", async () => {
    const all = await Game.find({});
    io.emit("init games", all);
  });

  socket.on("update games", async () => {
    const all = await Game.find({});
    io.emit("update games", all);
  })
});

// Function to start game with countdown
function startGame(io,gameId) {
  // let countdown = 10; // example 10-second countdown
  // const intervalId = setInterval(() => {
  //   io.to(gameId).emit("game starting", countdown);
  //   countdown--;
  //   if (countdown < 0) {
  //     io.to(gameId).emit("game start", countdown);
  //     clearInterval(intervalId);
  //     // Additional logic to officially start the game
  //   }
  // }, 1000);
}

// Set the port
const PORT = 5000; // Setting the port number from environment variable or defaulting to 5000

// Start the HTTP server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
