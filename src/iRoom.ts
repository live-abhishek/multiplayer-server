export interface IRoom {
  roomName: string;
  gameType: string;
  players: Array<any>;
  /**
   * socket is regarded as player, so the two are equal in the context of room
   */
  addPlayer(socket: any): void;
  isGameOver(): boolean;
  isAvailable(): boolean;
  processEvent(event: any, socket: any): void;
}
