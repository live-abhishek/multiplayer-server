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
   * Represents the state of the tictactoe board
   * 0 - match is in progress
   * 1 - you won
   * 2 - you lost
   */
  matchState: number;
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
  readonly roomName: string;
  /**
   * Represents the state of the tictactoe board
   * 0 - cell has not been played
   * 1 = O - cell marked by player 1
   * 2 = X - cell markde by player 2
   */
  private gameState: Array<Array<number>> = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  constructor(roomName: string) {
    this.roomName = roomName;
  }

  addPlayer(socket: any): void {
    this.players.push(socket);
    if (!this.isAvailable()) {
      this.startGame();
    }
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

  isAvailable(): boolean {
    if (this.players.length === 2) {
      return false;
    } else {
      return true;
    }
  }

  private isGameOver(): boolean {
    return false;
  }

  processEvent(event: any, socket: any): void {
    const playerId = this.getPlayerId(socket);
    const newCellState = playerId + 1;
    const tttEvent = <TicTacToeRequestEvent>event;
    this.updateGameBoard(tttEvent, newCellState);
    this.sendResponse(socket, tttEvent.cellNum, newCellState, playerId);
  }

  private updateGameBoard(event: TicTacToeRequestEvent, newCellState: number): void {
    const cell = this.cellNumToCellIndex(event.cellNum);
    if (this.gameState[cell.row][cell.col] !== 0) {
      throw new Error('Tampered data received.');
    }
    this.gameState[cell.row][cell.col] = newCellState;
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
    // caculate match state by determinig who won, if game has ended
    // and then remove this room
    return response;
  }

  private getPlayerId(currSocket: any): number {
    return this.players.findIndex(playerSocket => playerSocket.id === currSocket.id);
  }

  private cellNumToCellIndex(cellNum: number): { row: number, col: number } {
    const row = Math.floor(cellNum / 3);
    const col = cellNum - row * 3;
    return { row, col };
  }

  private cellIndexToCellNum(cellIndex: { row: number, col: number }): number {
    return cellIndex.row * 3 + cellIndex.col;
  }
}
