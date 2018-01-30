export enum TicTacToeMatchResultState {
  inpro,
  result,
  tied,
  wait
}

export class TicTacToeMatch {
  /**
   * Represents the state of the tictactoe board
   * 0 - cell has not been played
   * 1 = O - cell marked by player 1
   * 2 = X - cell markde by player 2
   */
  boardState: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  starterPlayerIndex = 0;
  nextTurnPlayerIndex: number = 0;
  matchResult: TicTacToeMatchResultState = TicTacToeMatchResultState.wait;
  winState: Array<number> = [];
  history: Array<{ cellNum: number; cellState: number }> = [];

  constructor(initialPlayerTurn?: number) {
    if (initialPlayerTurn) {
      this.starterPlayerIndex = initialPlayerTurn;
    }
    this.nextTurnPlayerIndex = this.starterPlayerIndex;
  }
}
