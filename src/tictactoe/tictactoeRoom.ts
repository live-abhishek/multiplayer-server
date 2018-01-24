import { IRoom } from '../iRoom';

const TIC_TAC_TOE: string = 'tictactoe';

export interface TicTacToeRequestEvent {
  gameType: string;
  eventType: string;
  cellNum: number;
}

enum ResponseMatchResultState {
  inpro = 'inpro',
  win = 'win',
  lost = 'lost',
  tied = 'tied',
  disconnected = 'disconnected'
}

export class TicTacToeResponseEvent {
  readonly gameType: string = TIC_TAC_TOE;
  cellNum: number;
  cellState: number;
  myTurn: boolean;
  matchResult: ResponseMatchResultState = ResponseMatchResultState.inpro;
}

enum RoomMatchResultState {
  inpro,
  result,
  tied,
  disconnected
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
  turn: number = 0;
  roomMatchResult: RoomMatchResultState = RoomMatchResultState.inpro;
  roomClosed: boolean = false;
  readonly roomName: string;
  /**
   * Represents the state of the tictactoe board
   * 0 - cell has not been played
   * 1 = O - cell marked by player 1
   * 2 = X - cell markde by player 2
   */
  private boardState: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  private history: Array<{ cellNum: number, cellState: number }> = [];

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
    return this.roomMatchResult === RoomMatchResultState.inpro ? false : true;
  }

  isAvailable(): boolean {
    return this.players.length < 2;
  }

  processEvent(event: any, socket: any): void {
    if (this.isRoomClosed()) {
      return;
    }
    this.updateGameBoard(event, socket);
    this.turn = (this.turn + 1) % 2; // after updating game-board give turn to next player
    this.sendResponse();
  }

  handleDisconnection(socket: any): void {
    this.players.filter(player => player.id !== socket.id)
      .forEach(player => player.emit('playerDisconnected', { gameType: this.gameType, matchResult: 'disconnected' }));
    this.roomClosed = true;
  }

  isRoomClosed(): boolean {
    return this.roomClosed;
  }

  private startGame() {
    if (this.isRoomClosed()) {
      return;
    }
    this.turn = 0; // set that 1st player to make the move is 0th player
    this.players.forEach((socket, idx) => {
      socket.emit('gameRequestFulfilled',
        {
          gameType: this.gameType,
          myTurn: idx === this.turn // start with the 0th player
        }
      );
    });
  }

  private findMatchResult() {
    const gs = this.boardState;
    if (gs.every(cell => cell !== 0)) {
      this.roomMatchResult = RoomMatchResultState.tied;
    }
    for (let i = 0; i < TicTacToeRoom.winStates.length; i++) {
      const ws = TicTacToeRoom.winStates[i];
      if (gs[ws[0]] !== 0 && gs[ws[1]] !== 0 && gs[ws[2]] !== 0 && // none of the winning states are 0
        (gs[ws[0]] === gs[ws[1]] && gs[ws[1]] === gs[ws[2]])) { // all the three winning states are same
        this.roomMatchResult = RoomMatchResultState.result;
      }
    }
  }

  private updateGameBoard(event: any, socket: any): void {
    const cellNewState = this.getPlayerId(socket) + 1;
    const tttEvent = <TicTacToeRequestEvent>event;
    if (this.boardState[event.cellNum] !== 0) {
      throw new Error('Tampered data received.');
    }
    this.boardState[event.cellNum] = cellNewState;
    this.history.push({ cellNum: event.cellNum, cellState: cellNewState });
    this.findMatchResult();
  }

  private sendResponse(): void {
    const lastMove = this.history[this.history.length - 1];
    this.players.forEach((socket, idx) => {
      const response = this.createResponse(lastMove.cellNum, lastMove.cellState, this.turn === idx);
      socket.emit('gameMoveResponse', response);
    });
  }

  private createResponse(cellNum: number, cellState: number, thisPlayerTurn: boolean): TicTacToeResponseEvent {
    const response = new TicTacToeResponseEvent();
    response.cellNum = cellNum;
    response.cellState = cellState;
    response.myTurn = thisPlayerTurn;
    if (this.roomMatchResult === RoomMatchResultState.result) {
      response.matchResult = thisPlayerTurn ? ResponseMatchResultState.lost : ResponseMatchResultState.win;
    } else if (this.roomMatchResult === RoomMatchResultState.tied) {
      response.matchResult = ResponseMatchResultState.tied;
    } else {
      response.matchResult = ResponseMatchResultState.inpro;
    }
    return response;
  }

  private getPlayerId(currSocket: any): number {
    return this.players.findIndex(playerSocket => playerSocket.id === currSocket.id);
  }

}
