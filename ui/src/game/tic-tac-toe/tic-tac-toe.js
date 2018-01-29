import React from "react";
import { TransitionGroup } from "react-transition-group";
import classNames from 'classnames';
import Popout from "../../animations/popout";
import "./tic-tac-toe.css";
import LinearIndeterminate from "../../animations/linearIndeterminate";

const TIC_TAC_TOE = 'tictactoe';

class TicTacToeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningCells: []
    };
  }

  handleCellClick = index => () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === 'inpro' && turn === 'me') {
      let moveEventData = {
        gameType: TIC_TAC_TOE,
        eventType: 'move',
        cellNum: index
      };
      this.props.onCellClick(moveEventData);      
    } else {
      return;
    }
  }

  getCellClasses = (index) => {
    const { winState } = this.props.matchState;
    return classNames({
      'cell': true,
      'cell-background-transition': winState.some(cell => cell === index)
    });
  }

  getTurnMessage = (turn) => {
    if (turn === 'me') {
      return (<div>Your turn</div>);
    } else if (turn === 'opp') {
      return (<div>Opponent's turn</div>);
    } else if (turn === 'wait') {
      return (<LinearIndeterminate />);
    }
  }

  render() {
    const { turn, board, matchPos } = this.props.matchState;
    return (
      <div>
        <div className="turn-msg">
          {this.getTurnMessage(turn, matchPos)}
        </div>
        <div className="board">
          {board.map((cell, index) => {
            return (
              <div key={`${index}`} className={this.getCellClasses(index)}>
                <TransitionGroup appear>
                  {cell === 0 && (
                    <img
                      src="https://image.ibb.co/c0q1Ew/transparent.png"
                      alt=""
                      className="cell-content-empty"
                      onClick={this.handleCellClick(index)}
                    />
                  )}
                  {cell === 1 && (
                    <Popout>
                      <img
                        src="https://image.ibb.co/nDDDuw/circle_outline.png"
                        alt=""
                        className='cell-content'
                      />
                    </Popout>
                  )}
                  {cell === 2 && (
                    <Popout>
                      <img
                        src="https://image.ibb.co/jY0nMb/close.png"
                        alt=""
                        className='cell-content'
                      />
                    </Popout>
                  )}
                </TransitionGroup>
              </div>
            );
          })}
        </div>
        {}
      </div>
    );
  }
}

export default TicTacToeBoard;
