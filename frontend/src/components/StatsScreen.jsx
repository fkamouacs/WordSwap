import { React, useEffect, useState } from "react";
import { useSocket } from "../../SocketContext"
import StatsTable from "./StatsTable";

import axios from "axios"

const StatsScreen = (props) => {
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
    // Setup listener for 'game starting' event from server
    if (!socket) return;
    socket.emit("init games");

    socket.on("init games", (games) => {
    
      setGames(games);

      
    });

    socket.on("update games", (games) => {
      setGames(games);
    })

    // Cleanup listener on component unmount
    return () => {
      socket.off("init games");
    
    };
  }, [socket]);

  const displayTable = () => {
    if (isAllGames) {
      return <StatsTable games={games} usernames={usernames} user={"65c520577862ca9c209aa60d"}/>;
    }
    
   const lastHour = getGamesLastHour();
   return <StatsTable games={lastHour} usernames={usernames}/>
  };

  const getGamesLastHour = () => {
    const lastHour = games.filter((game) => {
      let currDate = new Date();
      let date = new Date(game.endTime);
      let difference = currDate.getTime() - date.getTime();
      let hoursMilli = 1000 * 60 * 60;
  
      
     return Math.abs(difference) < hoursMilli
    })
    return lastHour;
  
  }

  const handleHome = () => {
    props.setPage("HOME")
  }

  return (
    <div className="stats-screen">
      <h1>Stats Screen</h1>
      <button onClick={()=> handleHome()}>Back to Home</button>
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
