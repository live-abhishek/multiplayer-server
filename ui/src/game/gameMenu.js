import React from "react";
import SimpleMediaCard from "../components/simpleMediaCard";
import tictactoeImage from "./tic-tac-toe/ttt.jpg";
import comingSoonImage from "./coming-soon.png";
import "./gameMenu.css";

const gameMenu = props => {
  const clickHandler = param => () => {
    props.requestHandler(param);
  };
  return (
    <div className="menu">
      <div className="item">
        <SimpleMediaCard
          onClick={clickHandler("tictactoe")}
          image={tictactoeImage}
          title="Tic-Tac-Toe-1"
          detail="Play a quick game with a random person around the globe"
        />
      </div>
      <div className="item">
        <SimpleMediaCard
          // onClick={clickHandler("tictactoe2")}
          image={comingSoonImage}
          title="Coming Soon"
          detail="Stay Tuned"
        />
      </div>
    </div>
  );
};

export default gameMenu;
