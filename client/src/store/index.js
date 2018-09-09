import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import furbabies from './furbabies';
import parents from './parents';
import furbabyDetail from './furbabyDetail';
import filterFurbaby from './filterFurbaby';
import user from './user';
import flashMsg from './flashMsg';

let store = null;

if (process.env.NODE_ENV === 'production') {
  store = combineReducers({ furbabies, parents, furbabyDetail, filterFurbaby, user, flashMsg });
} else {
  const reducer = combineReducers({ furbabies, parents, furbabyDetail, filterFurbaby, user, flashMsg });
  const middleware = process.env.NODE_ENVIRONMENT === 'production' ? applyMiddleware(thunkMiddleware) : applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(reducer, composeEnhancers(middleware));
}

export default store;
export * from './furbabies';
export * from './parents';
export * from './furbabyDetail';
export * from './filterFurbaby';
export * from './user';