import React from "react";
import "./customLoading.css";
import gameImage from "../../images/game.svg";

export const CustomLoading = props => {
  return (
    <div className="custload-grid">
      <div className="custload-loading">
        <div className="custload-button custload-orange" />
        <div className="custload-button custload-red" />
        <div className="custload-button custload-green" />
        <div className="custload-button custload-blue" />
        <img className="custload-img" src={gameImage} alt="" />
      </div>
      <div className="custload-wait-msg">
        Please Wait...<br />We are trying to find an oppponent for you.<br/>Ask your friend to join.
      </div>
    </div>
  );
};
