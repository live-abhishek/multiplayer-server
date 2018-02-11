import * as AppConstants from "../../constants";

export function initializeMatch(matchInitData) {
  return {
    type: AppConstants.TTT_INIT_MATCH,
    payload: matchInitData
  };
}

export function sendMove(moveEventData) {
  return {
    type: AppConstants.TTT_SEND_MOVE,
    payload: moveEventData
  };
}

export function gameMoveResponse(moveRespData) {
  return {
    type: AppConstants.TTT_GAME_MOVE_RESPONSE,
    payload: moveRespData
  };
}

export function playerDisconnected(disconnectionData) {
  return {
    type: "DISCONNECTED",
    payload: disconnectionData
  };
}
