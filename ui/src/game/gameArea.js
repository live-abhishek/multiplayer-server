import React from "react";
import TicTacToeContainer from "./tic-tac-toe/tttContainer";
import DotsContainer from "./dots/dotsContainer";
import GameMenu from "./gameMenu";
import { connect } from "react-redux";
import { requestGame } from "./gameAction";
import { sendGameRequest } from "../socketHelper/socketProvider";
import MessageBar from "../components/messageBar";
import { CustomLoading } from "../components/waiting/customLoading";

const gameArea = props => {
  return (
    <div>
      {props.pageState === "MENU" && (
        <div>
          <GameMenu requestHandler={props.requestGame} />
          <MessageBar reason={props.responseState.reason} />
        </div>
      )}
      {props.pageState === "WAITING" && <CustomLoading />}
      {props.pageState === "FULFILLED" &&
        props.responseState.gameType === "tictactoe" && (
          <TicTacToeContainer responseState={props.responseState} />
        )}
      {props.pageState === "FULFILLED" &&
        props.responseState.gameType === "dots" && (
          <DotsContainer responseState={props.responseState} />
        )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pageState: state.game.pageState,
    responseState: state.game.responseState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestGame: gameType => {
      sendGameRequest({ gameType });
      dispatch(requestGame(gameType));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(gameArea);
