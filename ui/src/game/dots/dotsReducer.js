import * as AppConstants from "../../constants";

const initBoard = () => {
  const boardState = [];
  for (let i = 0; i < 11; i++) {
    const row = [];
    for (let j = 0; j < 11; j++) {
      row.push(0);
    }
    boardState.push(row);
  }
  return boardState;
};

const initialState = {
  turn: "wait",
  board: initBoard(),
  matchPos: "inpro",
  matchScore: [0, 0],
  score: {
    won: 0,
    lost: 0,
    ties: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.DOTS_INIT_MATCH:
      state = {
        ...state,
        gameType: action.payload.gameType,
        board: action.payload.boardState,
        matchPos: action.payload.matchResult,
        turn: action.payload.myTurn ? "me" : "opp",
        matchScore: action.payload.matchScore,
        score: action.payload.roomScore
      };
      break;
    case AppConstants.DOTS_SEND_MOVE:
      state = {
        ...state,
        turn: "wait"
      };
      break;
    case AppConstants.DOTS_GAME_MOVE_RESPONSE:
      state = {
        ...state,
        gameType: action.payload.gameType,
        board: action.payload.boardState,
        matchPos: action.payload.matchResult,
        turn: action.payload.myTurn ? "me" : "opp",
        matchScore: action.payload.matchScore,
        score: action.payload.roomScore
      };
      break;
  }
  return state;
};
