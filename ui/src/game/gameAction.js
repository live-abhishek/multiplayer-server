import * as AppConstants from "../constants";

export function requestGame(gameType) {
  return {
    type: AppConstants.GAME_REQUEST,
    payload: gameType
  };
}

export function requestGameFulfilled(data) {
  return {
    type: AppConstants.GAME_REQUEST_FULFILLED,
    payload: data
  };
}

export function leaveRoom() {
  return {
    type: AppConstants.LEAVE_ROOM
  };
}

export function playerDisconnected(disconnectionData) {
  return {
    type: AppConstants.DISCONNECTED,
    payload: disconnectionData
  };
}
