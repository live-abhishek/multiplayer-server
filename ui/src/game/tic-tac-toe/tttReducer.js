const initialState = {
  // "wait", "me", "opp"
  turn: "wait",
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

const updateBoard = (oldBoard, cellNum, cellState) => {
  const newBoard = [...oldBoard];
  newBoard[cellNum] = cellState;
  return newBoard;
}

const calculateWinningState = (board) => {

}

export default (state = initialState, action) => {
  switch (action.type) {
    case "INIT_TIC_TAC_TOE_MATCH":
      state = {
        ...state,
        turn: action.payload.myTurn ? "me" : "opp"
      }
      break;
    case "SEND_MOVE":
      state = {
        ...state,
        turn: "wait"
      }
      break;
    case "GAME_MOVE_RESPONSE":
      const payload = action.payload;
      state = {
        ...state,
        board: updateBoard(state.board, payload.cellNum, payload.cellState),
        gameType: payload.gameType,
        matchPos: payload.matchState,
        turn: payload.myTurn ? "me" : "opp"
      }
  }
  return state;
}