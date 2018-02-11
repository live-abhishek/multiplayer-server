import * as AppConstants from "../constants";

const initialState = {
  pageState: AppConstants.MENU,
  responseState: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.GAME_REQUEST:
      state = {
        ...state,
        pageState: AppConstants.WAITING
      };
      break;
    case AppConstants.GAME_REQUEST_FULFILLED:
      state = {
        ...state,
        pageState: AppConstants.FULFILLED,
        responseState: action.payload
      };
      break;
    case AppConstants.DISCONNECTED:
      state = {
        ...state,
        pageState: AppConstants.MENU,
        responseState: action.payload
      };
      break;
    case AppConstants.LEAVE_ROOM:
      state = {
        ...state,
        pageState: AppConstants.MENU,
        responseState: {}
      };
    default:
      break;
  }
  return state;
};
