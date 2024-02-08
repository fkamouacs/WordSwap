import { useState } from "react"import InGamePage from "./in_game_page";
}

export default function PageDirectory(){


    const PAGE_MODE = {
        HOME : "HOME",
        WAITING_ROOM : "WAITING ROOM",
        IN_GAME : "IN GAME",
        VIEW_STAT : "VIEW STAT"
    }

    const [PAGE, setPage] = useState(PAGE_MODE.HOME);
    const [gameRoom, setGameRoom] = useState(""); // for in game

    const socket = io('http://localhost:5000');



    switch (PAGE){
        case PAGE.HOME:
            return(<></>)
        case PAGE.WAITING_ROOM:
            return(<></>)
        case PAGE.IN_GAME:
            return(<><InGamePage/></>)
        case PAGE.VIEW_STAT:
            return(<></>)
        default:
            return(<></>)
    }
}