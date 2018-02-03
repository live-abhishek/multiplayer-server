import React from "react";
import GameArea from "./game/gameArea";
import "./App.css";
import Header from "./header/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <GameArea />
    </div>
  );
};

export default App;
