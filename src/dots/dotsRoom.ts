import { IRoom } from "../iRoom";
import { Player } from "../player";

export class DotsRoom implements IRoom {
  roomName: string;
  gameType: string;
  players: any[];

  constructor(roomName: string) {
    this.roomName = roomName;
  }
  addPlayer(player: Player): void {
    throw new Error("Method not implemented.");
  }
  isAvailable(): boolean {
    throw new Error("Method not implemented.");
  }
  processEvent(event: any, player: Player): void {
    throw new Error("Method not implemented.");
  }
  handleDisconnection(socket: any): void {
    throw new Error("Method not implemented.");
  }
  isRoomClosed(): boolean {
    throw new Error("Method not implemented.");
  }
}
