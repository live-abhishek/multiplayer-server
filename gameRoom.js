const uuidv1 = require('uuid/v1');
const Room = require('./room');

const gameRooms = {
  tictactoe: [],
  tictactoe2: []
};
const roomMap = {};

const createRoom = (gameType) => {
  let room = new Room(uuidv1(), gameType);
  gameRooms[gameType].push(room);
  return room;
}

const addSocketToRoom = (room, socket) => {
  room.addPlayer(socket);
  roomMap[socket.id] = room.roomName;
}

const removeRoom = (room) => {
  room.playerSockets.forEach(socket => {
    socket.leave(room.roomName);
    delete roomMap[socket.id];
  });
  gameRooms[room.roomName] = gameRooms[room.gameType].filter(currRoom => currRoom.roomName !== room.roomName);
}

const addPlayerToRoom = (socket, gameType) => {
  let availableRoom = gameRooms[gameType].find(room => room.isAvailable());
  if (availableRoom) {
    addSocketToRoom(availableRoom, socket);
  } else {
    let newRoom = createRoom(gameType);
    addSocketToRoom(newRoom, socket);
  }
}

module.exports = {
  addPlayerToRoom,
}