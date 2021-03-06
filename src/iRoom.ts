import { Player } from "./player";

export interface IRoom {
  roomName: string;
  gameType: string;
  players: Array<any>;
  /**
   * socket is regarded as player, so the two are equal in the context of room
   */
  addPlayer(player: Player): void;
  isAvailable(): boolean;
  processEvent(event: any, player: Player): void;
  handleDisconnection(socket: any, reason: string): void;
  handleLeaveRoom(socket: any, reason: string): void;
  isRoomClosed(): boolean;
}
