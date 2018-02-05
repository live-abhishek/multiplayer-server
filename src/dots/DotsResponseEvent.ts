import { AppConstants } from "../appConstants";

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
  score: { won: number; lost: number; ties: number };
  starter: boolean;
}
