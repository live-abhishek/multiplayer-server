import React from "react";
import SimpleMediaCard from "../components/simpleMediaCard";
import tictactoeImage from "../images/tic-tac-toe.png";
import dots from "../images/dots.png";
import "./gameMenu.css";

const gameMenu = props => {
  const clickHandler = param => () => {
    props.requestHandler(param);
  };
  return (
    <div className="game-menu-menu">
      <div className="game-menu-item">
        <SimpleMediaCard
          onClick={clickHandler("tictactoe")}
          image={tictactoeImage}
          title="Tic-Tac-Toe"
          detail="Play a quick game with a random person around the globe"
        />
      </div>
      <div className="game-menu-item">
        <SimpleMediaCard
          onClick={clickHandler("dots")}
          image={dots}
          title="Dots"
          detail="Play a game of dots"
        />
      </div>
    </div>
  );
};

export default gameMenu;
