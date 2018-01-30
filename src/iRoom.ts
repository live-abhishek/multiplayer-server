import { Player } from "./player";

export interface IRoom {
  roomName: string;
  gameType: string;
  players: Array<any>;
  /**
   * socket is regarded as player, so the two are equal in the context of room
   */
  addPlayer(player: Player): void;
  isGameOver(): boolean;
  isAvailable(): boolean;
  processEvent(event: any, player: Player): void;
  handleDisconnection(socket: any): void;
  isRoomClosed(): boolean;
}
