<<<<<<< HEAD
import { useState } from 'react'
import './App.css'
import InGamePage from './components/in_game_page'


function App() {
  const [count, setCount] = useState(0)





  return (
    <>
    <InGamePage/>
    </>
  )
=======
import React from "react";
import GameComponent from "./components/GameComponent"; // Import the game component

function App() {
  return (
    <div className="App">
      <GameComponent />
    </div>
  );
>>>>>>> 1268b9dd18fb403019495b8fdca0677fffa2df25
}

export default App;
