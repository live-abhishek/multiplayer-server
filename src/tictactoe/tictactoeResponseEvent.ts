import { AppConstants } from "../appConstants";
import { TicTacToeMatch, TicTacToeMatchResultState } from "./tictactoeMatch";
import { Player } from "../player";
import { TicTacToeRoom } from "./tictactoeRoom";

export enum ResponseMatchResultState {
  inpro = "inpro",
  win = "win",
  lost = "lost",
  tied = "tied",
  disconnected = "disconnected"
}

export class TicTacToeResponseEvent {
  readonly gameType: string = AppConstants.TIC_TAC_TOE;
  boardState: Array<number>;
  myTurn: boolean;
  matchResult: ResponseMatchResultState = ResponseMatchResultState.inpro;
  winState: Array<number>;
  score: { won: number; lost: number; ties: number };

  constructor(
    match: TicTacToeMatch,
    playerIndex: number,
    roomScore: Array<number>
  ) {
    this.boardState = match.boardState;
    this.myTurn = match.nextTurnPlayerIndex === playerIndex;
    this.winState = match.winState;
    this.matchResult = this.findMatchResult(match);
    this.score = this.createScoreResponse(roomScore, playerIndex);
  }

  private findMatchResult(match: TicTacToeMatch) {
    let matchResult;
    if (match.matchResult === TicTacToeMatchResultState.result) {
      matchResult = !this.myTurn
        ? ResponseMatchResultState.win
        : ResponseMatchResultState.lost;
    } else if (match.matchResult === TicTacToeMatchResultState.tied) {
      matchResult = ResponseMatchResultState.tied;
    } else {
      matchResult = ResponseMatchResultState.inpro;
    }

    return matchResult;
  }

  /**
   * If the playerIndex is 0, then his win is roomScore[0] & his loss is roomScore[1]
   * If the playerIndex is 1, then his win in roomScore[1] & his loss is roomScore[0] === roomScore[(1+1)%2]
   * @param playerIndex the player's index for whom this response is being constructed
   */
  private createScoreResponse(
    roomScore: Array<number>,
    playerIndex: number
  ): { won: number; lost: number; ties: number } {
    const scoreResponse = {
      won: roomScore[playerIndex],
      lost: roomScore[(playerIndex + 1) % TicTacToeRoom.maxPlayers],
      ties: roomScore[2]
    };
    return scoreResponse;
  }
}
