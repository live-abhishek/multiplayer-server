const initialState = {
  pageState: "MENU",
  responseState: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GAME_REQUEST":
      state = {
        ...state,
        pageState: "WAITING"
      };
      break;
    case "GAME_REQUEST_FULFILLED":
      state = {
        ...state,
        pageState: "FULFILLED",
        responseState: action.payload
      };
      break;
    case "DISCONNECTED":
      state = {
        ...state,
        pageState: "MENU",
        responseState: action.payload
      };
      break;
  }
  return state;
};
