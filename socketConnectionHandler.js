const { addPlayerToRoom } = require('./gameRoom');

// pass this as the on connection handler in a socket main handler
const connectionHandler = (socket) => {
  socket.on('message', (data) => {
    socket.send(`echo ${data}`);
  });
  socket.on('gameRequest', (data) => {
    addPlayerToRoom(socket, data.gameType);
  });
};

module.exports = connectionHandler;