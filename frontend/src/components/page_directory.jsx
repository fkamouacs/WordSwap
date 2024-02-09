import { useState } from "react"
import InGamePage from "./in_game_page";
import { useSocket } from "../../SocketContext";
import WaitingRoom from "./waitingRoom";

export default function PageDirectory(){


    const PAGE_MODE = {
        HOME : "HOME",
        WAITING_ROOM : "WAITING ROOM",
        IN_GAME : "IN GAME",
        VIEW_STAT : "VIEW STAT"
    }

    const [PAGE, setPage] = useState(PAGE_MODE.WAITING_ROOM);
    const [gameRoom, setGameRoom] = useState(""); // for in game
    
    const socket = useSocket();



    switch (PAGE){
        case PAGE_MODE.HOME:
            return(<></>)
        case PAGE_MODE.WAITING_ROOM:
            return(<><WaitingRoom/></>)
        case PAGE_MODE.IN_GAME:
            return(<><InGamePage/></>)
        case PAGE_MODE.VIEW_STAT:
            return(<></>)
        default:
            return(<></>)
    }
}