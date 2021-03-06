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
      "ttt-cell": true,
      "ttt-cell-background-transition": winState.some(cell => cell === index)
    });
  };

  getTurnMessage = () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === "inpro" && turn === "wait") {
      return <LinearIndeterminate />;
    } else if (matchPos === "inpro" && turn === "me") {
      return <div className="dots-me dots-turn">your turn </div>;
    } else if (matchPos === "inpro" && turn === "opp") {
      return <div className="dots-opp dots-turn">opp turn</div>;
    }
  };

  render() {
    const { board, score } = this.props.matchState;
    return (
      <div className="ttt-center-area">
        <div className="ttt-score-holder">
          <ScoreBoard
            showTies={true}
            won={score.won}
            lost={score.lost}
            ties={score.ties}
          />
        </div>
        <div className="ttt-board">
          {board.map((cell, index) => {
            return (
              <div key={`${index}`} className="ttt-border-holder">
                <div className={this.getCellClasses(index)}>
                  {cell === 0 && (
                    <img
                      src="https://image.ibb.co/c0q1Ew/transparent.png"
                      alt=""
                      className="ttt-cell-content-empty"
                      onClick={this.handleCellClick(index)}
                    />
                  )}
                  {cell === 1 && (
                    <Popout>
                      <img src={oImage} alt="" className="ttt-cell-content" />
                    </Popout>
                  )}
                  {cell === 2 && (
                    <Popout>
                      <img src={xImage} alt="" className="ttt-cell-content" />
                    </Popout>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {this.getTurnMessage()}
      </div>
    );
  }
}

export default TicTacToeBoard;
