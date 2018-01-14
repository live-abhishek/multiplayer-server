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
  }
  return state;
}