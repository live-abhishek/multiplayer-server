import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import gameReducer from './game/gameReducer';

export default createStore(
  combineReducers({
    game: gameReducer
  }),
  {},
  applyMiddleware(createLogger(), thunk, promise())
);