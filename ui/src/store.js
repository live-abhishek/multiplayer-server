import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import gameReducer from "./game/gameReducer";
import tttReducer from "./game/tic-tac-toe/tttReducer";

export default createStore(
  combineReducers({
    game: gameReducer,
    ttt: tttReducer
  }),
  {},
  applyMiddleware(createLogger(), thunk, promise())
);
