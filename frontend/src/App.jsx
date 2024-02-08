import { useState } from "react";
import "./App.css";
import InGamePage from "./components/in_game_page";
import StatsScreen from "./components/StatsScreen"; // Testing purposes

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <InGamePage />
      <StatsScreen />
    </>
  );
}

export default App;
