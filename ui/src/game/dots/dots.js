import React from "react";
import LinearIndeterminate from "../../animations/linearIndeterminate";
import ScoreBoard from "../../components/scoreBoard/scoreBoard";
import Popout from "../../animations/popout";

class Dots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState =[
        [1, 1],
        [1, 1, 1, 0, 1]
        [1, 2],
        [1, 1, 2, 2, 2]
        []
      ]
    }
  }

  getWaitMessage = () => {
    const { turn, matchPos } = this.props.matchState;
    if (matchPos === "inpro" && turn === "wait") {
      return <LinearIndeterminate />;
    }
  };

  createDots = (count) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(
        <div className="dot"></div>
      )
    }
    return dots;
  }

  renderHorizontalLineRow = (row) => {
    const cellHorLines = row.map(cell => {
      return (
        <div className="hor-line">
        </div>
      )
    });
    const dots = this.createDots(row.length + 1);
    // mix dots & horLines alternately, with dots first
    const horLine = []
    for (let i = 0; i < row.length; i++) {
      horLine.push(dots[i]);
      horLine.push(cellHorLines[i]);
    }
    horLine.push(dots[row.length]);
    return horLine;
  }

  renderVerticalLineRow = (row) => {
    const cellVerLines = (row.map(cell => {
      return (
        <div className="ver-line">
        </div>
      )
    }));
    const dots = this.createDots(row.length - 1);
    // mix dots & verLines alternately, with line first
    const verLine = [];
    for (let i = 0; i < row.length; i++) {
      verLine.push(cellVerLines[i]);
      verLine.push(dots[i]);
    }
    verLine.push(cellVerLines[row.length]);
    return verLine;
  }

  renderRow = (row, rowIndex) => {
    if (rowIndex % 2) {
      return this.renderVerticalLineRow(row);
    } else {
      return this.renderHorizontalLineRow(row);
    }
  }

  render() {
    const { board } = this.state.board;
    return (
      <div className="center-area">
        <div className="score-holder">
          <ScoreBoard />
        </div>
        <div className="board">
          {board.map((row, rowIndex) => {
            this.renderRow(row, rowIndex);
          })}
        </div>
      </div>
    );
  }
}