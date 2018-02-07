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
}
