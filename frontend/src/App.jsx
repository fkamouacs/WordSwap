
import { useState } from "react";
import "./App.css";
import InGamePage from "./components/in_game_page";
import StatsScreen from "./components/StatsScreen"; // Testing purposes

import PageDirectory from "./components/page_directory"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PageDirectory/>
    </>

  );
}

export default App;
