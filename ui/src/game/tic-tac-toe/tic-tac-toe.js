import React from "react";
import classNames from "classnames";
import Popout from "../../animations/popout";
import "./tic-tac-toe.css";
import LinearIndeterminate from "../../animations/linearIndeterminate";
import ScoreBoard from "../../components/scoreBoard/scoreBoard";
import oImage from "../../images/O.png";
import xImage from "../../images/X.png";

const TIC_TAC_TOE = "tictactoe";

class TicTacToeBoard extends React.Component {
  handleCellClick = index => () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === "inpro" && turn === "me") {
      const moveEventData = {
        gameType: TIC_TAC_TOE,
        eventType: "move",
        cellNum: index
      };
      this.props.onCellClick(moveEventData);
    }
  };

  getCellClasses = index => {
    const { winState } = this.props.matchState;
    return classNames({
      cell: true,
      "cell-background-transition": winState.some(cell => cell === index)
    });
  };

  getWaitMessage = () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === "inpro" && turn === "wait") {
      return <LinearIndeterminate />;
    }
  };

  getStartIndicator = () => {
    const { starter } = this.props.matchState;
    if (starter) {
      return (
        <Popout>
          <div className="start">Start</div>
        </Popout>
      );
    }
  };

  render() {
    const { board, score } = this.props.matchState;
    return (
      <div className="center-area">
        <div className="score-holder">
          <ScoreBoard
            won={score.won}
            lost={score.lost}
            ties={score.ties}
          />
        </div>
        <div className="board">
          {board.map((cell, index) => {
            return (
              <div key={`${index}`} className="border-holder">
                <div className={this.getCellClasses(index)}>
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
                      <img src={oImage} alt="" className="cell-content" />
                    </Popout>
                  )}
                  {cell === 2 && (
                    <Popout>
                      <img src={xImage} alt="" className="cell-content" />
                    </Popout>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="turn-msg">{this.getWaitMessage()}</div>
        {this.getStartIndicator()}
      </div>
    );
  }
}

export default TicTacToeBoard;
