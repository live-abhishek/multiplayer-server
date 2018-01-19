const initialState = {
  gameState: 'MENU',
  gameType: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GAME_REQUEST":
      state = {
        ...state,
        gameState: 'WAITING'
      }
      break;
    case "GAME_REQUEST_FULFILLED":
      state = {
        ...state,
        gameState: 'FULFILLED',
        gameType: action.payload.gameType
      }
  }
  return state;
}