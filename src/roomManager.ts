import * as uuidv1 from "uuid/v1";
import { IRoom } from "./iRoom";
import { TicTacToeRoom } from "./tictactoe/tictactoeRoom";
import { DotsRoom } from "./dots/dotsRoom";
import { logger } from "./bunyan";
import { Player } from "./player";
import { AppConstants } from "./appConstants";

export interface GameRequest {
  gameType: string;
}

export class RoomManager {
  private static roomManager: RoomManager;
  private rooms: Array<IRoom> = [];
  private playerRoomMap: { [palyerId: string]: IRoom } = {};
  private constructor() { }

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
      case AppConstants.TIC_TAC_TOE:
        room = new TicTacToeRoom(uuidv1());
        break;
      case AppConstants.DOTS:
        room = new DotsRoom(uuidv1());
        break;
      default:
        throw new Error("Unidentified game type");
    }
    return room;
  }

  private createRoom(requestData: GameRequest, player: Player): IRoom {
    const room = this.ctreateRoomByGameType(requestData.gameType);
    this.addPlayerToRoom(room, player);
    this.rooms.push(room);
    return room;
  }

  private addPlayerToRoom(room: IRoom, player: Player) {
    room.addPlayer(player);
    this.playerRoomMap[player.id] = room;
  }

  private removeRoom(room: IRoom) {
    room.players.forEach(player => this.roomPlayerFromMap(player));
    this.rooms = this.rooms.filter(
      curRoom => curRoom.roomName !== room.roomName
    );
    room.players = [];
  }

  public processGameRequest(player: Player, requestData: GameRequest) {
    logger.info("requested by: ", player.id, JSON.stringify(requestData));
    this.roomPlayerFromMap(player); // to ensure that player is not already part of some room
    const availableRoom = this.rooms.find(
      room => room.gameType === requestData.gameType && room.isAvailable() && !room.isRoomClosed()
    );
    if (availableRoom) {
      this.addPlayerToRoom(availableRoom, player);
    } else {
      this.createRoom(requestData, player);
    }
  }

  public processGameEvent(player: Player, moveEventData: any) {
    logger.info("move by: ", player.id, JSON.stringify(moveEventData));
    const room = this.playerRoomMap[player.id];
    if (room) {
      room.processEvent(moveEventData, player);
    } else {
      logger.error("Room not found");
    }
  }

  public handleDisconnection(player: Player) {
    logger.info("disconnected: ", player.id);
    const room = this.playerRoomMap[player.id];
    if (room) {
      room.handleDisconnection(player, "Player dropped!");
    }
    this.roomPlayerFromMap(player);
  }

  public handleLeaveRoom(player: Player) {
    logger.info("left: ", player.id);
    const room = this.playerRoomMap[player.id];
    if (room) {
      room.handleLeaveRoom(player, "Player left!");
    }
    this.roomPlayerFromMap(player);
  }

  public getAllRoomInfo(): Array<{
    name: string;
    gameType: string;
    players: Array<string>;
    isRoomClosed: boolean
  }> {
    const rooms = this.rooms.map(room => {
      return {
        name: room.roomName,
        gameType: room.gameType,
        players: room.players.map(player => player.id),
        isRoomClosed: room.isRoomClosed()
      };
    });
    return rooms;
  }

  private roomPlayerFromMap(player: Player) {
    delete this.playerRoomMap[player.id];
  }
}
