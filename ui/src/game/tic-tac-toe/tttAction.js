export function initializeMatch(matchInitData){
  return {
    type: "INIT_TIC_TAC_TOE_MATCH",
    payload: matchInitData
  }
}

export function sendMove(gameData) {
  return {
    type: "SEND_MOVE",
    payload: gameData
  }
}

export function gameMoveResponse(gameData){
  return{
    type: "GAME_MOVE_RESPONSE",
    payload: gameData
  }
}