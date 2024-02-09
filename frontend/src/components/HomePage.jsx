import React, { useState, useEffect } from "react";
import axios from 'axios';

function HomePage(){
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        // Fetch player name from the server
        axios.get('http://localhost:5000/')
          .then((response) => {
            setPlayerName(response.data.playerName);
          })
          .catch((error) => {
            console.error('Error fetching player name:', error);
          });
    }, []);

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