import React, { useState, useEffect } from "react";
import { useSocket } from '../../SocketContext';
import axios from 'axios';
import WaitingModal from "./waiting_modal";

function HomePage({playerName,setPlayerName,find_game,setStatPage,stop_find_game}){


    const [openWaitModal, setOpenWaitModal] = useState(false)

    useEffect(() => {
        // Check if the playerName is already in cookies
        if (document.cookie.includes("PlayerName")) {
            console.log(document.cookie)
            const nameFromCookie = document.cookie.split("PlayerName=")[1];
            if (nameFromCookie) {
                setPlayerName(nameFromCookie);
                console.log(nameFromCookie + " was found in cookies");
                return;
            }
        }

        // If not in cookies, fetch player name from the server
        async function getPlayerName() {
            try {
                const response = await axios.post('http://localhost:5000/api/players/');
                setPlayerName(response.data.playerName);
                document.cookie = "PlayerName=" + response.data.playerName;
                console.log("no player name cookie found");
                console.log(response.data.playerName);
            } catch (error) {
                console.error('Error fetching player name:', error);
            }
        }
        getPlayerName();
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