import { React, useEffect, useState } from "react";
import { useSocket } from "../../SocketContext"
import StatsTable from "./StatsTable";

import axios from "axios"

const StatsScreen = () => {
  // Track what game list to show
  const [isAllGames, setIsAllGames] = useState(true);
  const [games, setGames] = useState([]);
  const [usernames, setUsernames] = useState([])

  // Retrieve socket instance from context
  const socket = useSocket();

  
useEffect(() => {
  
  for (let i = 0; i < games.length; i++) {
  

    axios.get(`http://localhost:5000/api/players/${games[i].user1.player}/username`).then((res)=> {
      setUsernames((n) => ({...n, [games[i].user1.player]: res.data}))
    
    })
   

    axios.get(`http://localhost:5000/api/players/${games[i].user2.player}/username`).then((res)=> {
      setUsernames((n)=>({...n, [games[i].user2.player]: res.data}))
    
    })

  }

},[games])


useEffect(() => {
    console.log(usernames)
},[usernames])

  useEffect(() => {
    // Setup listener for 'game starting' event from server
    if (!socket) return;
    socket.emit("init games");

    socket.on("init games", (games) => {
      console.log(games);
      setGames(games);

      
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off("init games");
    };
  }, [socket]);

  const displayTable = () => {
    if (isAllGames) {
      return <StatsTable games={games} usernames={usernames} />;
    }
  };

  return (
    <div className="stats-screen">
      <h1>Stats Screen</h1>
      <div>
        <button onClick={() => setIsAllGames(true)}>All Games</button>
        <button onClick={() => setIsAllGames(false)}>Recent Games</button>
      </div>
      <table>
        <tbody>{displayTable()}</tbody>
      </table>
    </div>
  );
};

export default StatsScreen;
