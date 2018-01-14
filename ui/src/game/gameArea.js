import React from 'react';
import TicTacToe from './tic-tac-toe/tic-tac-toe';
import GameMenu from './gameMenu';
import CircularIndeterminate from './gameWaiting';
import { connect } from 'react-redux';
import { requestGame } from './gameAction';
import socket from '../socketProvider';

const gameArea = (props) => {
  return (
    // <TicTacToe />
    <div>
      {props.gameState === 'MENU' && <GameMenu requestHandler={props.requestGame} />}
      {props.gameState === 'WAITING' && <CircularIndeterminate />}
      {props.gameState === 'FULFILLED' && props.gameType === 'tictactoe' && <TicTacToe />}
      {props.gameState === 'FULFILLED' && props.gameType === 'tictactoe2' && <div>TicTacToe2</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameState: state.game.gameState,
    gameType: state.game.gameType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGame: (gameType) => {
      socket.emit('gameRequest', { gameType })
      dispatch(requestGame(gameType));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(gameArea);