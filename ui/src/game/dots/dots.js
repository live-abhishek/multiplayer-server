import React from "react";
import LinearIndeterminate from "../../animations/linearIndeterminate";
import ScoreBoard from "../../components/scoreBoard/scoreBoard";
import Popout from "../../animations/popout";
import "./dots.css";
import * as AppConstants from "../../constants";

class Dots extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCellClick = (row, col) => () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === "inpro" && turn === "me") {
      const moveEventData = {
        gameType: AppConstants.DOTS,
        eventType: "move",
        move: {
          rowNum: row,
          colNum: col
        }
      };
      this.props.onCellClick(moveEventData);
    }
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

  createDot = (row, col) => {
    return <div className="dots-dot" key={`${row}-${col}`} />;
  };

  createBox = (val, row, col) => {
    if (val === 0) {
      return <div className="dots-box" key={`${row}-${col}`} />;
    } else if (val === 1) {
      return <div className="dots-box dots-box-p1" key={`${row}-${col}`} />;
    } else if (val === 2) {
      return <div className="dots-box dots-box-p2" key={`${row}-${col}`} />;
    }
  };

  createHorCell = (val, row, col) => {
    if (val === 0) {
      return (
        <div
          className="dots-hor-cell"
          key={`${row}-${col}`}
          onClick={this.handleCellClick(row, col)}
        >
          <div className="dots-hor-line" />
        </div>
      );
    } else if (val === 1) {
      return (
        <div className="dots-hor-cell" key={`${row}-${col}`}>
          <div className="dots-hor-line dots-line-p1" />
        </div>
      );
    } else if (val === 2) {
      return (
        <div className="dots-hor-cell" key={`${row}-${col}`}>
          <div className="dots-hor-line dots-line-p2" />
        </div>
      );
    }
  };

  createVerCell = (val, row, col) => {
    if (val === 0) {
      return (
        <div
          className="dots-ver-cell"
          key={`${row}-${col}`}
          onClick={this.handleCellClick(row, col)}
        >
          <div className="dots-ver-line" />
        </div>
      );
    } else if (val === 1) {
      return (
        <div className="dots-ver-cell" key={`${row}-${col}`}>
          <div className="dots-ver-line dots-line-p1" />
        </div>
      );
    } else if (val === 2) {
      return (
        <div className="dots-ver-cell" key={`${row}-${col}`}>
          <div className="dots-ver-line dots-line-p2" />
        </div>
      );
    }
  };

  renderHorizontalLineRow = (row, rowIndex) => {
    const horLine = row.map((cell, cellIndex) => {
      if (cellIndex % 2 === 0) {
        return this.createDot(rowIndex, cellIndex);
      } else {
        return this.createHorCell(cell, rowIndex, cellIndex);
      }
    });
    return horLine;
  };

  renderVerticalLineRow = (row, rowIndex) => {
    const verLine = row.map((cell, cellIndex) => {
      if (cellIndex % 2 === 0) {
        return this.createVerCell(cell, rowIndex, cellIndex);
      } else {
        return this.createBox(cell, rowIndex, cellIndex);
      }
    });
    return verLine;
  };

  renderRow = (row, rowIndex) => {
    if (rowIndex % 2) {
      return this.renderVerticalLineRow(row, rowIndex);
    } else {
      return this.renderHorizontalLineRow(row, rowIndex);
    }
  };

  getMatchScore = matchScore => {
    return (
      <div className="dots-match-score-container">
        <span className="dots-match-score dots-match-score-p1">
          {matchScore[0]}
        </span>
        <span className="dots-match-score dots-match-score-p2">
          {matchScore[1]}
        </span>
      </div>
    );
  };

  render() {
    const { board, score, matchScore } = this.props.matchState;
    return (
      <div className="dots-center-area">
        <div className="dots-score-holder">
          <ScoreBoard won={score.won} lost={score.lost} ties={score.ties} />
        </div>
        {this.getMatchScore(matchScore)}
        <div className="dots-board">
          {board.map((row, rowIndex) => {
            return this.renderRow(row, rowIndex);
          })}
        </div>
        {this.getTurnMessage()}
      </div>
    );
  }
}

export default Dots;
