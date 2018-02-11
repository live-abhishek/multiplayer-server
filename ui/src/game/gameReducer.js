import * as AppConstants from "../constants";

const initialState = {
  pageState: "MENU",
  responseState: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.GAME_REQUEST:
      state = {
        ...state,
        pageState: "WAITING"
      };
      break;
    case AppConstants.GAME_REQUEST_FULFILLED:
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
    case AppConstants.LEAVE_ROOM:
      state = {
        ...state,
        pageState: "MENU",
        responseState: {}
      };
    default:
      break;
  }
  return state;
};
