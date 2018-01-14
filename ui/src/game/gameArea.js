import React from 'react';
import TicTacToe from './tic-tac-toe/tic-tac-toe';
import GameMenu from './gameMenu';
import CircularIndeterminate from './gameWaiting';
import { connect } from 'react-redux';
import { requestGame } from './gameAction';

const gameArea = (props) => {
  return (
    // <TicTacToe />
    <div>
      {props.gameState === 'MENU' && <GameMenu requestHandler={props.requestGame} />}
      {props.gameState === 'WAITING' && <CircularIndeterminate />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameState: state.game.gameState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGame: () => {
      console.log('something')
      dispatch(requestGame());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(gameArea);