import socket from '../socketProvider';

export function requestGame(gameType) {
  return {
    type: "GAME_REQUEST",
    payload: gameType
  }
}

export function requestGameFulfilled(gameType) {
  return {
    type: "GAME_REQUEST_FULFILLED",
    payload: gameType
  }
}