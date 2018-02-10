import {
  DotsResponseEvent,
  ResponseDotsMatchResultState
} from "./DotsResponseEvent";
import { DotsRoom } from "./dotsRoom";

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

  public createResponse(playerIndex: number): DotsResponseEvent {
    const response = new DotsResponseEvent();
    response.boardState = this.boardState;
    response.myTurn = this.nextTurnPlayerIndex === playerIndex;
    response.matchResult = this.findMatchResult(playerIndex);
    response.matchScore = this.score;
    return response;
  }

  private findMatchResult(playerIndex: number): ResponseDotsMatchResultState {
    if (this.matchResult === DotsMatchResultState.result) {
      // if match is won; to determine whether this player won or lost
      // check the match score by this player index
      // if this player has higher score, he won else lost
      if (
        this.score[playerIndex] >
        this.score[(playerIndex + 1) % DotsRoom.maxPlayers]
      ) {
        // this player won
        return ResponseDotsMatchResultState.win;
      } else if (
        this.score[playerIndex] <
        this.score[(playerIndex + 1) % DotsRoom.maxPlayers]
      ) {
        // this player lost
        return ResponseDotsMatchResultState.lost;
      } else {
        // match tied; Unnecessary
        return ResponseDotsMatchResultState.tied;
      }
    } else {
      return ResponseDotsMatchResultState.inpro;
    }
  }
}
