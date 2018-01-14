class Room {
  constructor(roomName, gameType) {
    this.roomName = roomName;
    this.gameType = gameType;
    this.playerSockets = [];
  }
  addPlayer(playerSocket) {
    this.playerSockets.push(playerSocket);
  }
}

module.exports = Room;