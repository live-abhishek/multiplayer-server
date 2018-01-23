import React from 'react';
import TicTacToeContainer from './tic-tac-toe/tttContainer';
import GameMenu from './gameMenu';
import CircularIndeterminate from './gameWaiting';
import { connect } from 'react-redux';
import { requestGame } from './gameAction';
// Calling this on the main menu to register all socket events
import { socket } from '../socketHelper/socketRegisterer';
import { sendGameRequest } from '../socketHelper/socketHelper';

const gameArea = (props) => {
  return (
    // <TicTacToe />
    <div>
      {props.pageState === 'MENU' && <GameMenu requestHandler={props.requestGame} />}
      {props.pageState === 'WAITING' && <CircularIndeterminate />}
      {props.pageState === 'FULFILLED' && props.responseState.gameType === 'tictactoe' && <TicTacToeContainer responseState={props.responseState} />}
      {props.pageState === 'FULFILLED' && props.responseState.gameType === 'tictactoe2' && <div>TicTacToe2</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pageState: state.game.pageState,
    responseState: state.game.responseState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGame: (gameType) => {
      sendGameRequest({ gameType });
      dispatch(requestGame(gameType));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(gameArea);