import React from "react";
import LinearIndeterminate from "../../animations/linearIndeterminate";
import ScoreBoard from "../../components/scoreBoard/scoreBoard";
import Popout from "../../animations/popout";
import "./dots.css";

class Dots extends React.Component {
  constructor(props) {
    super(props);
  }

  getWaitMessage = () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === "inpro" && turn === "wait") {
      return <LinearIndeterminate />;
    }
  };

  createDot = () => {
    return <div className="dots-dot" />;
  };

  createBox = () => {
    return <div className="dots-box" />;
  };

  createHorCell = () => {
    return (
      <div className="dots-hor-cell">
        <div className="dots-hor-line" />
      </div>
    );
  };

  createVerCell = () => {
    return (
      <div className="dots-ver-cell">
        <div className="dots-ver-line" />
      </div>
    );
  };

  renderHorizontalLineRow = row => {
    const horLine = row.map((cell, colIndex) => {
      if (colIndex % 2 === 0) {
        return this.createDot();
      } else {
        return this.createHorCell();
      }
    });
    return horLine;
  };

  renderVerticalLineRow = row => {
    const verLine = row.map((cell, colIndex) => {
      if (colIndex % 2 === 0) {
        return this.createVerCell();
      } else {
        return this.createBox();
      }
    });
    return verLine;
  };

  renderRow = (row, rowIndex) => {
    if (rowIndex % 2) {
      return this.renderVerticalLineRow(row);
    } else {
      return this.renderHorizontalLineRow(row);
    }
  };

  render() {
    const { board } = this.props.matchState;
    return (
      <div className="dots-center-area">
        <div className="dots-score-holder">
          <ScoreBoard />
        </div>
        <div className="dots-board">
          {board.map((row, rowIndex) => {
            return this.renderRow(row, rowIndex);
          })}
        </div>
      </div>
    );
  }
}

export default Dots;
