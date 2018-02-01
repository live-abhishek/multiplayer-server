const initialState = {
  // "wait", "me", "opp"
  turn: "wait",
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  matchPos: "inpro",
  winState: [],
  score: {
    won: 0,
    lost: 0,
    ties: 0
  },
  starter: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INIT_TIC_TAC_TOE_MATCH":
      state = {
        ...state,
        gameType: action.payload.gameType,
        board: action.payload.boardState,
        turn: action.payload.myTurn ? "me" : "opp",
        matchPos: action.payload.matchResult,
        winState: action.payload.winState,
        score: action.payload.score,
        starter: action.payload.starter
      };
      break;
    case "SEND_MOVE":
      state = {
        ...state,
        turn: "wait"
      };
      break;
    case "GAME_MOVE_RESPONSE":
      state = {
        ...state,
        gameType: action.payload.gameType,
        board: action.payload.boardState,
        turn: action.payload.myTurn ? "me" : "opp",
        matchPos: action.payload.matchResult,
        winState: action.payload.winState,
        score: action.payload.score,
        starter: action.payload.starter
      };
      break;
  }
  return state;
};
