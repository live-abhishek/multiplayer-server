export function initializeMatch(matchInitData) {
  return {
    type: "INIT_TIC_TAC_TOE_MATCH",
    payload: matchInitData
  }
}

export function sendMove(moveEventData) {
  return {
    type: "SEND_MOVE",
    payload: moveEventData
  }
}

export function gameMoveResponse(moveRespData) {
  return {
    type: "GAME_MOVE_RESPONSE",
    payload: moveRespData
  }
}