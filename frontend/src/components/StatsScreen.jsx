import { React, useEffect, useState } from "react";
import { useSocket } from "../SocketContext";

const StatsScreen = () => {
  // Track what game list to show
  const [isAllGames, setIsAllGames] = useState(true);
  const [games, setGames] = useState([]);

  // Retrieve socket instance from context
  const socket = useSocket();

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
      return games.map((game) => {
        return (
          <tr key={game._id}>
            <td>{game.wordToGuess}</td>
          </tr>
        );
      });
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
