import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import furbabies from './furbabies';
import parents from './parents';
import furbabyDetail from './furbabyDetail';
import filterFurbaby from './filterFurbaby';
import user from './user';
import flashMsg from './flashMsg';

export * from './furbabies';
export * from './parents';
export * from './furbabyDetail';
export * from './filterFurbaby';
export * from './user';

if (process.env.NODE_ENVIRONMENT === 'production') {
  export default combineReducers({ furbabies, parents, furbabyDetail, filterFurbaby, user, flashMsg });
  return;
} else {
  const reducer = combineReducers({ furbabies, parents, furbabyDetail, filterFurbaby, user, flashMsg });
  const middleware = process.env.NODE_ENVIRONMENT === 'production' ? applyMiddleware(thunkMiddleware) : applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  export default createStore(reducer, composeEnhancers(middleware));
}