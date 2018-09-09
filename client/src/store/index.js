import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import furbabies from './furbabies';
import parents from './parents';
import furbabyDetail from './furbabyDetail';
import filterFurbaby from './filterFurbaby';
import user from './user';
import flashMsg from './flashMsg';

const store = combineReducers({ furbabies, parents, furbabyDetail, filterFurbaby, user, flashMsg });

export default store;
export * from './furbabies';
export * from './parents';
export * from './furbabyDetail';
export * from './filterFurbaby';
export * from './user';