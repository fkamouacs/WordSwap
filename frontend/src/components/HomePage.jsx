import React, { useState, useEffect } from "react";
import { useSocket } from '../../SocketContext';
import axios from 'axios';

function HomePage(){
    const [playerName, setPlayerName] = useState('');
    // Retrieve socket instance from context
    const socket = useSocket();

    if(document.cookie.includes("PlayerName")) {
        setPlayerName(document.cookie.split("=")[1]);
        console.log(playerName + " was found in cookies");
    }
    else {
        useEffect(() => {
            // Fetch player name from the server
            axios.post('http://localhost:5000/api/players/')
              .then((response) => {
                setPlayerName(response.data.playerName);
              })
              .catch((error) => {
                console.error('Error fetching player name:', error);
              });
        }, []);
        console.log("no player name cookie found");
        console.log(playerName);
        document.cookie = "PlayerName=" + playerName;
    }

    const handleFindGame = () => {
        
        console.log("Find Game Button Clicked");
    };
    const handleViewStats = () => {
        console.log("View Stats Button Clicked");
    };

    return(
        <div>
            <h1>Welcome to Word Swap, {playerName}!</h1>
            <button onClick={handleFindGame}>Find Game</button>
            <button onClick={handleViewStats}>View Stats</button>
        </div>
    );
}

export default HomePage;