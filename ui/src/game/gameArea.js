import React from 'react';
import TicTacToe from './tic-tac-toe/tic-tac-toe';
import GameMenu from './gameMenu';
import CircularIndeterminate from './gameWaiting';
import { connect } from 'react-redux';
import gameAction from './gameAction';
import socket from '../socketProvider';

const gameArea = (props) => {
  return (
    // <TicTacToe />
    <div>
      {props.requestState === 'MENU' && <GameMenu requestHandler={props.requestGame} />}
      {props.requestState === 'WAITING' && <CircularIndeterminate />}
      {props.requestState === 'FULFILLED' && props.gameType === 'tictactoe' && <TicTacToe />}
      {props.requestState === 'FULFILLED' && props.gameType === 'tictactoe2' && <div>TicTacToe2</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameState: state.game.requestState,
    gameType: state.game.gameType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGame: (gameType) => {
      socket.emit('gameRequest', { gameType })
      dispatch(gameAction.requestGame(gameType));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(gameArea);