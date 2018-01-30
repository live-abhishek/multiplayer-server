import React from "react";
import "./tttScoreBoard.css";

const TicTacToeScoreBoard = props => {
  return (
    <div className="scoreBoard">
      <div className="score-cell header">Won</div>
      <div className="score-cell header">Ties</div>
      <div className="score-cell header">Lost</div>
      <div className="score-cell">({props.won})</div>
      <div className="score-cell">({props.ties})</div>
      <div className="score-cell">({props.lost})</div>
    </div>
  );
};

export default TicTacToeScoreBoard;
