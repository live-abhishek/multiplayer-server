const initialState = {
  // "wait", "me", "opp"
  turn: "wait",
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  matchPos: 'inpro',
  winState: []
}

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const updateBoard = (oldBoard, cellNum, cellState) => {
  const newBoard = [...oldBoard];
  newBoard[cellNum] = cellState;
  return newBoard;
}

const calculateWinningState = (board) => {
  for (let i = 0; i < winStates.length; i++) {
    const ws = winStates[i];
    if (board[ws[0]] !== 0 && board[ws[1]] !== 0 && board[ws[2]] !== 0 &&
      board[ws[0]] === board[ws[1]] && board[ws[1]] === board[ws[2]]) {
      return ws;
    }
  }
  return [];
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
      const newBoard = updateBoard(state.board, payload.cellNum, payload.cellState);
      const winState = (payload.matchResult === 'win' || payload.matchResult === 'lost') ? calculateWinningState(newBoard) : [];
      state = {
        ...state,
        board: newBoard,
        gameType: payload.gameType,
        matchPos: payload.matchResult,
        turn: payload.myTurn ? "me" : "opp",
        winState: winState
      }
      break;
    case "DISCONNECTED":
      state = {
        ...state,
        gameType: action.payload.gameType,
        matchPos: action.payload.matchResult
      }
      break;
  }
  return state;
}