import { IRoom } from '../iRoom';

const TIC_TAC_TOE: string = 'tictactoe';

export interface TicTacToeRequestEvent {
  gameType: string;
  eventType: string;
  cellNum: number;
}

export class TicTacToeResponseEvent {
  gameType: string = TIC_TAC_TOE;
  cellNum: number;
  cellState: number;
  /**
   * Represents whose turn is it
   * 'true' when it is your turn
   * otherwise false
   */
  turn: boolean;
  /**
   * Represents the state of the tictactoe match
   * 0 - match is in progress
   * 1 - you won
   * 2 - you lost
   */
  matchState: number;
  /**
   * This is required if matchState is not 0
   */
  winState?: Array<number>;
}

export class TicTacToeRoom implements IRoom {
  private static readonly winStates: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  gameType: string = TIC_TAC_TOE;
  players: Array<any> = [];
  winState: Array<number>;
  readonly roomName: string;
  /**
   * Represents the state of the tictactoe board
   * 0 - cell has not been played
   * 1 = O - cell marked by player 1
   * 2 = X - cell markde by player 2
   */
  private gameState: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(roomName: string) {
    this.roomName = roomName;
  }

  addPlayer(socket: any): void {
    if (!this.isAvailable()) {
      throw new Error('Cannot add anymore player in this room');
    }
    this.players.push(socket);
    if (!this.isAvailable()) {
      this.startGame();
    }
  }

  isGameOver(): boolean {
    return this.winState ? true : false;
  }

  isAvailable(): boolean {
    return this.players.length < 2;
  }

  processEvent(event: any, socket: any): void {
    const playerId = this.getPlayerId(socket);
    const cellNewState = playerId + 1;
    const tttEvent = <TicTacToeRequestEvent>event;
    this.updateGameBoard(tttEvent, cellNewState);
    this.sendResponse(socket, tttEvent.cellNum, cellNewState, playerId);
  }

  private startGame() {
    this.players.forEach((socket, idx) => {
      socket.emit('gameRequestFulfilled',
        {
          gameType: this.gameType,
          turn: ((idx % 2) === 0)
        }
      );
    });
  }

  private findWinState() {
    for (let i = 0; i < TicTacToeRoom.winStates.length; i++) {
      const ws = TicTacToeRoom.winStates[i];
      const gs = this.gameState;
      if (gs[ws[0]] !== 0 && gs[ws[1]] !== 0 && gs[ws[2]] !== 0 && // none of the winning states are 0
        (gs[ws[0]] === gs[ws[1]] && gs[ws[1]] === gs[ws[2]])) { // all the three winning states are same
        this.winState = ws;
      }
    }
  }

  private updateGameBoard(event: TicTacToeRequestEvent, newCellState: number): void {
    if (this.gameState[event.cellNum] !== 0) {
      throw new Error('Tampered data received.');
    }
    this.gameState[event.cellNum] = newCellState;
    this.findWinState();
  }

  private sendResponse(socket: any, cellNum: number, newCellState: number, currMovePlayerId: number): void {
    this.players.forEach((socket, idx) => {
      const response = this.createResponse(cellNum, newCellState, currMovePlayerId !== idx);
      socket.emit('gameMoveResponse', response);
    });
  }

  private createResponse(cellNum: number, cellState: number, playerTurn: boolean): TicTacToeResponseEvent {
    const response = new TicTacToeResponseEvent();
    response.cellNum = cellNum;
    response.cellState = cellState;
    response.turn = playerTurn;
    if (this.isGameOver()) {
      // if player turn is true,
      // that means this player will play next move
      // but if the game is in won state,
      // it means that this player has lost
      // by the last move by that other player
      response.matchState = playerTurn ? 2 : 1;
    } else {
      response.matchState = 0;
    }
    response.winState = this.winState;
    return response;
  }

  private getPlayerId(currSocket: any): number {
    return this.players.findIndex(playerSocket => playerSocket.id === currSocket.id);
  }

}
