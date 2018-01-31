import React from "react";
import Button from "material-ui/Button";
import SimpleMediaCard from "../components/simpleMediaCard";
import tictactoeImage from "./tic-tac-toe/ttt.jpg";
import "./gameMenu.css";

const gameMenu = props => {
  const clickHandler = param => () => {
    props.requestHandler(param);
  };
  const { classes } = props;
  return (
    <div className="menu">
      <div className="item">
        <SimpleMediaCard
          onClick={clickHandler("tictactoe")}
          image={tictactoeImage}
          title="Tic-Tac-Toe-1"
          detail="blah blah blah"
        />
      </div >
      <div className="item">
        <SimpleMediaCard
          onClick={clickHandler("tictactoe2")}
          image={tictactoeImage}
          title="Tic-Tac-Toe-2"
          detail="double blah"
        />
      </div>
    </div>
  );
};

export default gameMenu;
