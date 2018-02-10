import React from "react";
import SimpleMediaCard from "../components/simpleMediaCard";
import tictactoeImage from "../images/tic-tac-toe.jpg";
import comingSoonImage from "../images/coming-soon.png";
import "./gameMenu.css";

const gameMenu = props => {
  const clickHandler = param => () => {
    props.requestHandler(param);
  };
  return (
    <div className="game-menu-menu">
      <div className="item">
        <SimpleMediaCard
          onClick={clickHandler("tictactoe")}
          image={tictactoeImage}
          title="Tic-Tac-Toe-1"
          detail="Play a quick game with a random person around the globe"
        />
      </div>
      <div className="game-menu-item">
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
