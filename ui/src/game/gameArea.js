import React from 'react';
import TicTacToe from './tic-tac-toe/tic-tac-toe';
import GameMenu from './gameMenu';
import CircularIndeterminate from './gameWaiting';
import { connect } from 'react-redux';
import { requestGame } from './gameAction';
import { sendGameRequest } from '../socketHelper/socketProvider';

const gameArea = (props) => {
  return (
    // <TicTacToe />
    <div>
      {props.pageState === 'MENU' && <GameMenu requestHandler={props.requestGame} />}
      {props.pageState === 'WAITING' && <CircularIndeterminate />}
      {props.pageState === 'FULFILLED' && props.gameType === 'tictactoe' && <TicTacToe />}
      {props.pageState === 'FULFILLED' && props.gameType === 'tictactoe2' && <div>TicTacToe2</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pageState: state.game.pageState,
    gameType: state.game.gameType
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