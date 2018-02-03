export function requestGame(gameType) {
  return {
    type: "GAME_REQUEST",
    payload: gameType
  };
}

export function requestGameFulfilled(data) {
  return {
    type: "GAME_REQUEST_FULFILLED",
    payload: data
  };
}

export function leaveRoom() {
  return {
    type: "LEAVE_ROOM",
  }
}
