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


    socket.on("game starting", (countdown) => {
        console.log(countdown)
    })





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

    function find_game(){
        socket.emit("find game", playerName)
    }

    function stop_find_game(){
        socket.emit("stop find game", playerName)
    }

    function setStatPage(){
        setPage(PAGE_MODE.VIEW_STAT)
    }

    switch (PAGE){
        case PAGE_MODE.HOME:
            return(<>
                <HomePage
                playerName={playerName}
                setPlayerName={setPlayerName}
                find_game={find_game}
                setStatPage={setStatPage}
                stop_find_game={stop_find_game}
                />
            </>)
        case PAGE_MODE.WAITING_ROOM:
            return(<>
            <TextField onChange={(event) => {setPlayerName(event.target.value)}}></TextField>
            <WaitingRoom/>
            </>)
        case PAGE_MODE.IN_GAME:
            return(<>
            <InGamePage 
                socket={socket}
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