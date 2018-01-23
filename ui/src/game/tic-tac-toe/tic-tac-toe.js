import React from "react";
import { TransitionGroup } from "react-transition-group";
import classNames from 'classnames';
import Popout from "../../animations/popout";
import "./tic-tac-toe.css";

const TIC_TAC_TOE = 'tictactoe';

class TicTacToeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      winningCells: []
    };
  }

  handleCellClick = index => () => {
    let moveEventData = {
      gameType: TIC_TAC_TOE,
      eventType: 'move',
      cellNum: index
    };
    this.props.onCellClick(moveEventData);
  }

  getCellClasses = (index) => {
    return classNames({
      'cell': true,
      'cell-background-transition': this.state.winningCells.some(cell => cell === index)
    });
  }

  render() {
    const { turn } = this.props.matchState;
    return (
      <div>
        {turn ? <div>Your turn</div> : <div>Opponent's turn</div>}
        <div className="board">
          {this.state.board.map((cell, index) => {
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
      </div>
    );
  }
}

export default TicTacToeBoard;
