import React from "react";
import LinearIndeterminate from "../../animations/linearIndeterminate";
import ScoreBoard from "../../components/scoreBoard/scoreBoard";
import Popout from "../../animations/popout";
import "./dots.css";

class Dots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[1, 1], [1, 1, 1, 0, 1], [1, 2], [1, 1, 2, 2, 2], [2, 2]]
    };
  }

  getWaitMessage = () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === "inpro" && turn === "wait") {
      return <LinearIndeterminate />;
    }
  };

  createDots = count => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(<div className="dot" />);
    }
    return dots;
  };

  renderHorizontalLineRow = row => {
    const cellHorLines = row.map(cell => {
      return (
        <div className="hor-cell">
          <div className="hor-line" />
        </div>
      );
    });
    const dots = this.createDots(row.length + 1);
    // mix dots & horLines alternately, with dots first
    const horLine = [];
    for (let i = 0; i < row.length; i++) {
      horLine.push(dots[i]);
      horLine.push(cellHorLines[i]);
    }
    horLine.push(dots[row.length]);
    return horLine;
  };

  renderVerticalLineRow = row => {
    const verLine = row.map((cell, colIndex) => {
      if (colIndex % 2) {
        return <div className="box" />;
      } else {
        return (
          <div className="ver-cell">
            <div className="ver-line" />
          </div>
        );
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
    const { board } = this.state;
    return (
      <div className="center-area">
        <div className="score-holder">
          <ScoreBoard />
        </div>
        <div className="board">
          {board.map((row, rowIndex) => {
            return this.renderRow(row, rowIndex);
          })}
        </div>
      </div>
    );
  }
}

export default Dots;