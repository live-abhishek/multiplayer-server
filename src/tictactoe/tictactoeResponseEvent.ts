import { AppConstants } from "../appConstants";

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
}
