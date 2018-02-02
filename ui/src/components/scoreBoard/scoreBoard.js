import React from "react";
import "./scoreBoard.css";

const ScoreBoard = props => {
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

export default ScoreBoard;
