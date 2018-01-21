import { IRoom } from '../iRoom';

export class TicTacToeRoom implements IRoom {
  private static readonly winStates: Array<Array<number>> = [];

  gameType: string = 'tictactoe';
  players: Array<any> = [];
  readonly roomName: string;
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
    this.players.forEach(socket => socket.emit('gameRequestFulfilled', { gameType: this.gameType }));
  }

  isAvailable(): boolean {
    if (this.players.length === 2) {
      return false;
    } else {
      return true;
    }
  }

  processEvent(event: any, socket: any): void {
    throw new Error('Method not implemented.');
  }
}
