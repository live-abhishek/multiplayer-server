const initialState = {
  // "wait", "me", "opp"
  turn: "wait"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "INIT_TIC_TAC_TOE_MATCH":
      state = {
        ...state,
        turn: action.payload.turn
      }
      break;
    case "SEND_MOVE":
      state = {
        ...state,
        turn: false
      }
      break;
  }
  return state;
}