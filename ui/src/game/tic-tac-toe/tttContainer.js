import React from 'react';
import TicTacToe from './tic-tac-toe';
import { connect } from './react-redux';

const TicTacToeContainer = (props) => {
  return (
    <TicTacToe matchState={props.responseState} />
  );
}

const mapStateToProps = (state) => {
  return {
    matchState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeContainer);
