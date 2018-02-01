import { IRoom } from "./iRoom";
import { Player } from "./player";

export enum RoomState {
  matchInPro = "matchInPro",
  waiting = "waiting",
  matchEnded = "matchEnded",
  closed = "closed"
}

export abstract class Room implements IRoom {
  roomName: string;
  gameType: string;
  players: any[];
  roomState: RoomState;

  constructor(roomName: string) {
    this.roomState = RoomState.waiting;
    this.roomName = roomName;
  }

  abstract addPlayer(player: Player): void;

  abstract isAvailable(): boolean;

  abstract processEvent(event: any, player: Player): void;

  handleDisconnection(player: Player) {
    this.players
      .filter(itrPlayer => itrPlayer.id !== player.id)
      .forEach(itrPlayer =>
        itrPlayer.socket.emit("playerDisconnected", {
          gameType: this.gameType,
          matchResult: "disconnected"
        })
      );
    this.roomState = RoomState.closed;
  }

  isRoomClosed(): boolean {
    return this.roomState === RoomState.closed;
  }
}
