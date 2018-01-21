import { RoomManager, GameRequest } from './roomManager';

const roomManager = RoomManager.getRoomManager();

// pass this as the on connection handler in a socket main handler
export const socketConnectionHandler = (socket: any) => {
  // socket.send('Connected to game server');
  socket.on('message', (data: any) => {
    socket.send(`echo ${data}`);
  });
  socket.on('gameRequest', (data: GameRequest) => {
    roomManager.processGameRequest(socket, data);
  });
  socket.on('gameMove', (data: any) => {
    roomManager.processGameEvent(socket, data);
  });
};
