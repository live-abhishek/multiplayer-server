import { IRoom } from "../iRoom";
import { Player } from "../player";
import { Room } from "../room";
import { AppConstants } from "../appConstants";

export class DotsRoom extends Room {
  roomName: string;
  gameType: string;
  players: any[];

  constructor(roomName: string) {
    super(roomName);
    this.gameType = AppConstants.DOTS;
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
