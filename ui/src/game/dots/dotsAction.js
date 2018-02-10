export function initializeMatch(matchInitData) {
  return {
    type: "INIT_DOTS_MATCH",
    payload: matchInitData
  };
}

export function sendMove(moveEventData) {
  return {
    type: "SEND_MOVE",
    payload: moveEventData
  };
}

export function gameMoveResponse(moveRespData) {
  return {
    type: "GAME_MOVE_RESPONSE",
    payload: moveRespData
  };
}

export function paylerDisconnected(disconnectionData) {
  return {
    type: "DISCONNECTED",
    payload: disconnectionData
  };
}
