import React from "react";
import { TransitionGroup } from "react-transition-group";
import classNames from 'classnames';
import Popout from "../../animations/popout";
import "./tic-tac-toe.css";

class TicTacToeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      winningCells: []
    };
  }

  handleBoardClick = () => {
    // on click set cell [1][2] explicitly
    let newBoard = [
      [...this.state.board[0]],
      [...this.state.board[1]],
      [...this.state.board[2]]
    ];
    newBoard[1][2] = 1;
    this.setState({ board: newBoard });
    let newWinningCells = [[1, 2], [0, 1]];
    this.setState({ winningCells: newWinningCells });
  };

  getCellClasses = (rowIndex, colIndex) => {
    return classNames({
      'cell': true,
      'cell-background-transition': this.state.winningCells.some(cell => cell[0] === rowIndex && cell[1] === colIndex)
    });
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            return (
              <div key={`${rowIndex}-${colIndex}`} className={this.getCellClasses(rowIndex, colIndex)}>
                <TransitionGroup appear>
                  {cell === 0 && (
                    <img
                      src="https://image.ibb.co/c0q1Ew/transparent.png"
                      alt=""
                      className="cell-content-empty"
                      onClick={this.handleBoardClick}
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
          })
        )}
      </div>
    );
  }
}

export default TicTacToeBoard;
