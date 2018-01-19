class Room {
  constructor(roomName, gameType) {
    this.roomName = roomName;
    this.gameType = gameType;
    this.playerSockets = [];
    this.roomBoardState = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }
  addPlayer(playerSocket) {
    this.playerSockets.push(playerSocket);
    this.startGameIfPlayersReady();
  }
  startGameIfPlayersReady() {
    if (this.playerSockets.length === 2) {
      this.playerSockets.forEach((socket, index) => socket.emit('gameRequestFulfilled', { gameType: this.gameType, turn: index === 0 }));
    }
  }
  isAvailable() {
    return this.playerSockets.length < 2;
  }
}

module.exports = Room;