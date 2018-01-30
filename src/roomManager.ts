import * as uuidv1 from "uuid/v1";
import { IRoom } from "./iRoom";
import { TicTacToeRoom } from "./tictactoe/tictactoeRoom";
import { logger } from "./bunyan";

export interface GameRequest {
  gameType: string;
}

export class RoomManager {
  private static roomManager: RoomManager;
  private rooms: Array<IRoom> = [];
  private playerRoomMap: { [key: string]: IRoom } = {};
  private constructor() {}

  static getRoomManager(): RoomManager {
    if (!RoomManager.roomManager) {
      RoomManager.roomManager = new RoomManager();
      setInterval(() => {
        RoomManager.roomManager.rooms
          .filter(room => room.isRoomClosed())
          .forEach(room => {
            logger.info(`Removed room ${room.roomName}`);
            RoomManager.roomManager.removeRoom(room);
          });
      }, 1000 * 60 * 5);
    }
    return RoomManager.roomManager;
  }

  private ctreateRoomByGameType(gameType: string): IRoom {
    let room: IRoom;
    switch (gameType) {
      case "tictactoe":
        room = new TicTacToeRoom(uuidv1());
        break;
      default:
        throw new Error("Unidentified game type");
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
    this.rooms = this.rooms.filter(
      curRoom => curRoom.roomName !== room.roomName
    );
    room.players = [];
  }

  public processGameRequest(socket: any, requestData: GameRequest) {
    logger.info("requested by: ", socket.id, JSON.stringify(requestData));
    const availableRoom = this.rooms.find(
      room => room.gameType === requestData.gameType && room.isAvailable()
    );
    if (availableRoom) {
      this.addPlayerToRoom(availableRoom, socket);
    } else {
      this.createRoom(requestData, socket);
    }
  }

  public processGameEvent(socket: any, moveEventData: any) {
    logger.info("move by: ", socket.id, JSON.stringify(moveEventData));
    const room = this.playerRoomMap[socket.id];
    if (room && !room.isGameOver()) {
      room.processEvent(moveEventData, socket);
    } else if (room && room.isGameOver()) {
      logger.error("Game over in room");
    } else {
      logger.error("Room not found");
    }
  }

  public handleDisconnection(socket: any) {
    logger.info("disconnected: ", socket.id);
    const room = this.playerRoomMap[socket.id];
    if (room) {
      room.handleDisconnection(socket);
    }
  }

  public getAllRoomInfo(): Array<{
    name: string;
    gameType: string;
    players: Array<string>;
  }> {
    const rooms = this.rooms.map(room => {
      return {
        name: room.roomName,
        gameType: room.gameType,
        players: room.players.map(player => player.id)
      };
    });
    return rooms;
  }
}
