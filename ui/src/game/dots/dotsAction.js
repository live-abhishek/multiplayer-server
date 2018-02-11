import * as AppConstants from "../../constants";

export function initializeMatch(matchInitData) {
  return {
    type: AppConstants.DOTS_INIT_MATCH,
    payload: matchInitData
  };
}

export function sendMove(moveEventData) {
  return {
    type: AppConstants.DOTS_SEND_MOVE,
    payload: moveEventData
  };
}

export function gameMoveResponse(moveRespData) {
  return {
    type: AppConstants.DOTS_GAME_MOVE_RESPONSE,
    payload: moveRespData
  };
}
