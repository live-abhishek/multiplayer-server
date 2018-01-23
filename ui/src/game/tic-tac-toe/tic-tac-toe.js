import React from "react";
import { TransitionGroup } from "react-transition-group";
import classNames from 'classnames';
import Popout from "../../animations/popout";
import "./tic-tac-toe.css";

class TicTacToeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      winningCells: []
    };
  }

  handleCellClick = () => {
    // on click set cell [5] explicitly
    let newBoard = [...this.state.board];
    newBoard[5] = 1;
    this.setState({ board: newBoard });
    let newWinningCells = [5, 1];
    this.setState({ winningCells: newWinningCells });
  };

  onCellMouseOver = (event) => {
    let cell = event.target;
    cell.className["cell-hover"] = true
  }

  onCellMouseOut = (event) => {
    let cell = event.target;
    console.log(cell.className);
    delete cell.className["cell-hover"];
  }

  getCellClasses = (index) => {
    return classNames({
      'cell': true,
      'cell-background-transition': this.state.winningCells.some(cell => cell === index)
    });
  }

  render() {
    return (
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
                    onClick={this.handleCellClick}
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
    );
  }
}

export default TicTacToeBoard;
