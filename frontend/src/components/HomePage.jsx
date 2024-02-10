import React, { useState, useEffect } from "react";
import axios from 'axios';
import WaitingModal from "./waiting_modal";

function HomePage({playerName,setPlayerName,find_game,setStatPage,stop_find_game}){


    const [openWaitModal, setOpenWaitModal] = useState(false)


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
        setOpenWaitModal(true)
        find_game()
    };
    const handleViewStats = () => {
        setStatPage()
    };

    const handleCancelButton = () => {
        setOpenWaitModal(false)
        stop_find_game()
    }

    return(<>
        <WaitingModal
            stop_find_game={stop_find_game}
            handleCancelButton={handleCancelButton}
            openWaitModal={openWaitModal}
        />
        <div>
            <h1>Welcome to Word Swap, {playerName}!</h1>
            <button onClick={handleFindGame}>Find Game</button>
            <button onClick={handleViewStats}>View Stats</button>
        </div>
        
        </>
        
    );
}

export default HomePage;