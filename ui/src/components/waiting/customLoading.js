import React from "react";
import "./customLoading.css";
import gameImage from "../../images/game.svg";

export const CustomLoading = props => {
  return (
    <div className="grid">
      <div className="loading">
        <img src={gameImage} alt="" />
        <div className="button orange" />
        <div className="button red" />
        <div className="button green" />
        <div className="button blue" />
      </div>
      <div className="wait-msg">
        Please Wait...<br />We are trying to find an oppponent for you.
      </div>
    </div>
  );
};
