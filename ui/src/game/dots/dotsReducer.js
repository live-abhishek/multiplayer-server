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
    case "INIT_DOTS_MATCH":
      break;
    case "SEND_MOVE":
      break;
    case "GAME_MOVE_RESPONSE":
      break;
  }
  return state;
};
