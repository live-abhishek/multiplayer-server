import { AppConstants } from "../appConstants";
import { DotsMatch, DotsMatchResultState } from "./dotsMatch";
import { DotsRoom } from "./dotsRoom";

export enum ResponseDotsMatchResultState {
  inpro = "inpro",
  win = "win",
  lost = "lost",
  tied = "tied",
  disconnected = "disconnected"
}

export class DotsResponseEvent {
  readonly gameType: string = AppConstants.DOTS;
  boardState: Array<Array<number>>;
  myTurn: boolean;
  matchResult: ResponseDotsMatchResultState = ResponseDotsMatchResultState.inpro;
  winState: Array<number>;
  roomScore: { won: number; lost: number; ties: number };
  matchScore: Array<number>;
  starter: boolean;

  constructor(match: DotsMatch, playerIndex: number, roomScore: Array<number>) {
    this.boardState = match.boardState;
    this.myTurn = match.nextTurnPlayerIndex === playerIndex;
    this.matchResult = this.findMatchResult(match, playerIndex);
    this.matchScore = match.score;
    this.roomScore = this.createRoomScore(roomScore, playerIndex);
  }

  private findMatchResult(
    match: DotsMatch,
    playerIndex: number
  ): ResponseDotsMatchResultState {
    if (match.matchResult === DotsMatchResultState.result) {
      // if match is won; to determine whether this player won or lost
      // check the match score by this player index
      // if this player has higher score, he won else lost
      if (
        match.score[playerIndex] >
        match.score[(playerIndex + 1) % DotsRoom.maxPlayers]
      ) {
        // this player won
        return ResponseDotsMatchResultState.win;
      } else if (
        match.score[playerIndex] <
        match.score[(playerIndex + 1) % DotsRoom.maxPlayers]
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

  private createRoomScore(
    roomScore: Array<number>,
    playerIndex: number
  ): { won: number; lost: number; ties: number } {
    const roomScoreResponse = {
      won: roomScore[playerIndex],
      lost: roomScore[(playerIndex + 1) % DotsRoom.maxPlayers],
      ties: 0
    };
    return roomScoreResponse;
  }
}
