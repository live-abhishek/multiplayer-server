export class Player {
  id: string;
  socket: any;
  constructor(socket: { id: string; [propName: string]: any }) {
    this.id = socket.id;
    this.socket = socket;
  }
}
