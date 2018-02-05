export enum DotsMatchResultState {
  inpro,
  result,
  tied,
  wait
}
export class DotsMatch {
  boardState: Array<Array<number>>;
  starterPlayerIndex: number = 0;
  nextTurnPlayerIndex: number;
  matchResult: DotsMatchResultState = DotsMatchResultState.wait;

  constructor(initialPlayerTurn?: number) {
    if (initialPlayerTurn) {
      this.starterPlayerIndex = initialPlayerTurn;
    }
    this.nextTurnPlayerIndex = this.starterPlayerIndex;
  }
}
