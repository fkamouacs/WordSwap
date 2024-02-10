import React, { useState, useEffect } from "react";
import { useSocket } from '../../SocketContext';
import axios from 'axios';
import WaitingModal from "./waiting_modal";

function HomePage({playerName,setPlayerName,find_game,setStatPage,stop_find_game}){


    const [openWaitModal, setOpenWaitModal] = useState(false)

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
        // Set player name in cookies
        const addcookie = "PlayerName=" + playerName;
        console.log(addcookie + " " + addcookie.length + " " + playerName.length);
        if(playerName.length > 0){
            console.log(playerName)
        }
        //document.cookie = "PlayerName=" + playerName;
    }

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