import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import furbabies from './furbabies';
import parents from './parents';
import furbabyDetail from './furbabyDetail';
import filterFurbaby from './filterFurbaby';

const reducer = combineReducers({ furbabies, parents, furbabyDetail, filterFurbaby });
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(reducer, composeEnhancers(middleware));

export default store;
export * from './furbabies';
export * from './parents';
export * from './furbabyDetail';
export * from './filterFurbaby';