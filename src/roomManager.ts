import * as uuidv1 from 'uuid/v1';
import { IRoom } from './iRoom';
import { TicTacToeRoom } from './tictactoe/tictactoeRoom';

export interface GameRequest {
  gameType: string;
}

export class RoomManager {
  private static roomManager: RoomManager;
  private rooms: Array<IRoom> = [];
  private playerRoomMap: { [key: string]: IRoom } = {};
  private constructor() {
  }

  static getRoomManager(): RoomManager {
    if (!RoomManager.roomManager) {
      RoomManager.roomManager = new RoomManager();
      setInterval(() => {
        RoomManager.roomManager.rooms
          .filter(room => room.isRoomClosed())
          .forEach(room => RoomManager.roomManager.removeRoom(room));
      }, 1000 * 60 * 5);
    }
    return RoomManager.roomManager;
  }

  private ctreateRoomByGameType(gameType: string): IRoom {
    let room: IRoom;
    switch (gameType) {
      case 'tictactoe':
        room = new TicTacToeRoom(uuidv1());
        break;
      default:
        throw new Error('Unidentified game type');
    }
    return room;
  }

  private createRoom(requestData: GameRequest, socket: any): IRoom {
    const room = this.ctreateRoomByGameType(requestData.gameType);
    this.addPlayerToRoom(room, socket);
    this.rooms.push(room);
    return room;
  }

  private addPlayerToRoom(room: IRoom, socket: any) {
    room.addPlayer(socket);
    this.playerRoomMap[socket.id] = room;
  }

  private removeRoom(room: IRoom) {
    room.players.forEach(player => delete this.playerRoomMap[player.id]);
    this.rooms = this.rooms.filter(curRoom => curRoom.roomName !== room.roomName);
    room.players = [];
  }

  public processGameRequest(socket: any, requestData: GameRequest) {
    console.log('requested by: ', socket.id);
    const availableRoom = this.rooms.find(room => room.gameType === requestData.gameType && room.isAvailable());
    if (availableRoom) {
      this.addPlayerToRoom(availableRoom, socket);
    } else {
      this.createRoom(requestData, socket);
    }
  }

  public processGameEvent(socket: any, moveEventData: any) {
    console.log('move by: ', socket.id);
    const room = this.playerRoomMap[socket.id];
    if (room && !room.isGameOver()) {
      room.processEvent(moveEventData, socket);
    } else if (room && room.isGameOver()) {
      throw new Error('Game over in room');
    } else {
      throw new Error('Room not found');
    }
  }

  public handleDisconnection(socket: any) {
    console.log('disconnected: ', socket.id);
    const room = this.playerRoomMap[socket.id];
    if (room) {
      room.handleDisconnection(socket);
    }
  }
}
