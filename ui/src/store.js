import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default createStore(
  combineReducers({}),
  {},
  applyMiddleware(createLogger(), thunk, promise())
);