import React from "react";
import "./scoreBoard.css";
import smileySmiling from "../../images/happiness.png";
import smileySad from "../../images/sad.png";
import smileyConfused from "../../images/embarrassed.png";
import Popout from "../../animations/popout";

const ScoreBoard = props => {
  return (
    <div className="scoreBoard">
      <div className="score-cell header">won</div>
      {props.showTies && <div className="score-cell header">tied</div>}
      {!props.showTies && <div />}
      <div className="score-cell header">lost</div>
      <div className="score-cell">( {props.won} )</div>
      {props.showTies && <div className="score-cell">( {props.ties} )</div>}
      {!props.showTies && <div />}
      <div className="score-cell">( {props.lost} )</div>
    </div>
  );
};

export default ScoreBoard;
