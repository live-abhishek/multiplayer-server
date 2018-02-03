import { RoomManager, GameRequest } from "./roomManager";
import { Player } from "./player";

const roomManager = RoomManager.getRoomManager();

// pass this as the on connection handler in a socket main handler
export const socketConnectionHandler = (socket: any) => {
  // socket.send('Connected to game server');
  socket.on("message", (data: any) => {
    socket.send(`echo ${data}`);
  });
  socket.on("gameRequest", (data: GameRequest) => {
    roomManager.processGameRequest(new Player(socket), data);
  });
  socket.on("gameMove", (data: any) => {
    roomManager.processGameEvent(new Player(socket), data);
  });
  socket.on("disconnect", () => {
    roomManager.handleDisconnection(new Player(socket));
  });
  socket.on("leave", (data: any) => {
    roomManager.handleLeaveRoom(new Player(socket));
  });
};
