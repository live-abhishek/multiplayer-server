const initialState = {
  pageState: 'MENU',
  gameType: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GAME_REQUEST":
      state = {
        ...state,
        pageState: 'WAITING'
      }
      break;
    case "GAME_REQUEST_FULFILLED":
      state = {
        ...state,
        pageState: 'FULFILLED',
        responseState: action.payload
      }
  }
  return state;
}