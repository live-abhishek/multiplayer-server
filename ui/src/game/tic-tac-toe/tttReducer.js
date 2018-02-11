import * as AppConstants from "../../constants";

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
    case AppConstants.TTT_INIT_MATCH:
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
    case AppConstants.TTT_SEND_MOVE:
      state = {
        ...state,
        turn: "wait"
      };
      break;
    case AppConstants.TTT_GAME_MOVE_RESPONSE:
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
    default:
      break;
  }
  return state;
};
