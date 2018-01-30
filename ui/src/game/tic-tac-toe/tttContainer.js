import React from "react";
import TicTacToe from "./tic-tac-toe";
import { connect } from "react-redux";
import { sendMove } from "./tttAction";
import { sendMoveRequest } from "../../socketHelper/socketTicTacToeProvider";

const TicTacToeContainer = props => {
  return (
    <TicTacToe matchState={props.matchState} onCellClick={props.sendMove} />
  );
};

const mapStateToProps = state => {
  return {
    matchState: state.ttt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMove: moveEventData => {
      sendMoveRequest(moveEventData);
      dispatch(sendMove(moveEventData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeContainer);
