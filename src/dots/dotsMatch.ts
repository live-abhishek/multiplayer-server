import { logger } from "../bunyan";
import {
  DotsResponseEvent,
  ResponseDotsMatchResultState
} from "./DotsResponseEvent";
import { DotsRoom } from "./dotsRoom";
import { DotsRequestEvent } from "./DotsRequestEvent";

export enum DotsMatchResultState {
  inpro,
  result,
  tied,
  wait
}
export class DotsMatch {
  static readonly BoardSize = 11;
  static readonly MaxBoxNum = 25;
  boardState: Array<Array<number>>;
  starterPlayerIndex: number = 0;
  nextTurnPlayerIndex: number;
  matchResult: DotsMatchResultState = DotsMatchResultState.wait;
  score: Array<number> = [0, 0];

  constructor(initialPlayerTurn?: number) {
    if (initialPlayerTurn) {
      this.starterPlayerIndex = initialPlayerTurn;
    }
    this.nextTurnPlayerIndex = this.starterPlayerIndex;
    this.boardState = [];
    for (let i = 0; i < DotsMatch.BoardSize; i++) {
      const row = [];
      for (let j = 0; j < DotsMatch.BoardSize; j++) {
        row.push(0);
      }
      this.boardState.push(row);
    }
  }

  public processMove(event: DotsRequestEvent, cellNewState: number) {
    // updateBoardState
    const dotsEvent = event as DotsRequestEvent;
    const { move } = event;
    if (this.boardState[move.rowNum][move.colNum] !== 0) {
      logger.error("Tampered data received");
      return;
    }
    const isNewBoxFormed = this.updateAndCheckBoxFormed(
      move.rowNum,
      move.colNum,
      cellNewState
    );
    // assign the nextTurnPlayerIndex based on whether
    // this move resulted in formation of new box
    if (!isNewBoxFormed) {
      // if new box is not formed, then assign to other player
      this.nextTurnPlayerIndex =
        (this.nextTurnPlayerIndex + 1) % DotsRoom.maxPlayers;
    }
  }

  public updateBoardScore() {
    let player1Score = 0;
    let player2Score = 0;
    for (let r = 1; r < DotsMatch.BoardSize; r += 2) {
      for (let c = 1; c < DotsMatch.BoardSize; c += 2) {
        if (this.boardState[r][c] === 1) {
          player1Score++;
        } else if (this.boardState[r][c] === 2) {
          player2Score++;
        }
      }
    }
    this.score = [player1Score, player2Score];
  }

  public updateMatchResult() {
    if (this.score.reduce((a, b) => a + b, 0) === DotsMatch.MaxBoxNum) {
      this.matchResult = DotsMatchResultState.result;
    } else {
      this.matchResult = DotsMatchResultState.inpro;
    }
  }

  private updateAndCheckBoxFormed(
    rowNum: number,
    colNum: number,
    cellNewState: number
  ): boolean {
    let boxFormed = false;
    this.boardState[rowNum][colNum] = cellNewState;
    if (rowNum % 2 !== 0) {
      // horizontal line drawn
      // if not the top most row horizontal line, then check if a box is formed just above
      if (rowNum !== 0) {
        const boxTopLine = this.boardState[rowNum - 2][colNum] !== 0;
        const boxLtLine = this.boardState[rowNum - 1][colNum - 1] !== 0;
        const boxRtLine = this.boardState[rowNum - 1][colNum + 1] !== 0;
        const boxBtmLine = this.boardState[rowNum][colNum] !== 0; // redundant
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.boardState[rowNum - 1][colNum] = cellNewState;
          boxFormed = true;
        }
      }
      // if not the bottom most row horizontal line, then check if a box is formed just below
      if (rowNum !== DotsMatch.BoardSize - 1) {
        const boxTopLine = this.boardState[rowNum][colNum] !== 0; // redundant
        const boxLtLine = this.boardState[rowNum + 1][colNum - 1] !== 0;
        const boxRtLine = this.boardState[rowNum + 1][colNum + 1] !== 0;
        const boxBtmLine = this.boardState[rowNum + 2][colNum] !== 0;
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.boardState[rowNum + 1][colNum] = cellNewState;
          boxFormed = true;
        }
      }
    } else {
      // vertical line drawn
      // if not the left most vertical line, then check if a box is formed just left
      if (colNum !== 0) {
        const boxTopLine = this.boardState[rowNum - 1][colNum - 1] !== 0;
        const boxLtLine = this.boardState[rowNum][colNum - 2] !== 0;
        const boxRtLine = this.boardState[rowNum][colNum] !== 0; // redundant
        const boxBtmLine = this.boardState[rowNum + 1][colNum - 1] !== 0;
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.boardState[rowNum][colNum - 1] = cellNewState;
          boxFormed = true;
        }
      }
      // if not the right most vertical line, then check if a box is formed just right
      if (colNum !== DotsMatch.BoardSize - 1) {
        const boxTopLine = this.boardState[rowNum - 1][colNum + 1] !== 0;
        const boxLtLine = this.boardState[rowNum][colNum] !== 0;
        const boxRtLine = this.boardState[rowNum][colNum + 2] !== 0;
        const boxBtmLine = this.boardState[rowNum + 1][colNum + 1] !== 0;
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.boardState[rowNum][colNum + 1] = cellNewState;
          boxFormed = true;
        }
      }
    }
    return boxFormed;
  }
}
