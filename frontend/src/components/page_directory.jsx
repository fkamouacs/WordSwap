import { useState, useEffect } from "react"
import InGamePage from "./in_game_page";

import { Button, TextField } from "@mui/material";

import axios from 'axios';
import io from 'socket.io-client';

import { useSocket } from "../../SocketContext";
import WaitingRoom from "./waitingRoom";
import StatsScreen from "./StatsScreen"
import HomePage from './HomePage'

export default function PageDirectory(){


    const PAGE_MODE = {
        HOME : "HOME",
        WAITING_ROOM : "WAITING ROOM",
        IN_GAME : "IN GAME",
        VIEW_STAT : "VIEW STAT"
    }

    const [PAGE, setPage] = useState(PAGE_MODE.HOME)
    const [gameRoom, setGameRoom] = useState(""); // for in game
    const [playerName, setPlayerName] = useState('');
    const [opponentName, setOpponentName] = useState('');

    // const socket = useSocket();
    // const socket = io('http://localhost:5000');

    const [socket] = useState(io('http://localhost:5000'))

    async function handleButton(){
        await axios.get('http://localhost:5000/')
          .then((response) => {
            console.log(response.data.playerName)
            setPlayerName(response.data.playerName);

            socket.emit("find game", response.data.playerName)

          })
          .catch((error) => {
            console.error('Error fetching player name:', error);
          });
        // socket.emit("find game")
    }

    socket.on("game starting", (countdown) => {
        console.log(countdown)
    })



    // useEffect(() => {
    //     console.log(playerName)
    //     socket.on("game created successfully", async (gameId) => {
    //         setGameRoom(gameId);
    //         console.log(playerName)
    //         socket.emit("set word", "mouse", playerName)
    //     })
    // }, [playerName]);

    socket.on("game created successfully", async (gameId) => {
        setGameRoom(gameId);
        console.log(playerName)
        setPage(PAGE_MODE.IN_GAME)
        // socket.emit("set word", playerName, playerName)
    })

    socket.on("opponent info", (opponent)=> {
        setOpponentName(opponent)
    })


    function setHomePage(){
        setPage(PAGE_MODE.HOME)
    }

    switch (PAGE){
        case PAGE_MODE.HOME:
            return(<><HomePage/></>)
        case PAGE_MODE.WAITING_ROOM:
            return(<>
            <TextField onChange={(event) => {setPlayerName(event.target.value)}}></TextField>
            <WaitingRoom/>
            </>)
        case PAGE_MODE.IN_GAME:
            return(<>
            <InGamePage 
                socket={socket}
                gameRoom={gameRoom}
                setGameRoom={setGameRoom}
                setPage={setPage}
                playerName={playerName}
                opponentName={opponentName}
                setHomePage={setHomePage}
            />
            </>)
        case PAGE_MODE.VIEW_STAT:
            return(<><StatsScreen/></>)
        default:
            return(<>
            {/* <TextField onChange={(event) => {setPlayerName(event.target.value)}}></TextField> */}
                <Button onClick={handleButton}>Button</Button>
            </>)
    }
}