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
  score: {
    won: 0,
    lost: 0,
    ties: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.DOTS_INIT_MATCH:
      break;
    case AppConstants.DOTS_SEND_MOVE:
      break;
    case AppConstants.DOTS_GAME_MOVE_RESPONSE:
      break;
  }
  return state;
};
