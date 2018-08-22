import axios from 'axios';
import history from '../history';
import { callActions } from './flashMsg';

const SET = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

const setUser = user => ({ type: SET, user });
const removeUser = () => ({ type: REMOVE });

const resToData = res => res.data;

const signUp = user => dispatch =>
  axios.post('http://localhost:8080/api/auth/signUp', user)
  .then(resToData)
  .then(user => {
    dispatch(setUser(user));
    return user;
  })
  .catch(err => {
    const {data} = err.response;
    dispatch(callActions(data));
  });

export const signUpAndWelcome = user => dispatch =>
  dispatch(signUp(user))
  // .then(() => history.push('/welcome'))
  .catch(err => console.error('Creating user unsuccessful', err));

export const removeUserThunk = () => dispatch =>
  axios.delete('http://localhost:8080/api/auth')
  .then(() => {
    dispatch(removeUser())
    history.push('/')
  })
  .catch(err => console.error('Error removing user', err));

const logIn = user => dispatch =>
  axios.post('http://localhost:8080/api/auth/logIn', user)
  .then(resToData)
  .then(user => {
    dispatch(setUser(user));
    return user;
  })

export const logInAndWelcome = user => dispatch =>
  dispatch(logIn(user))
  .then(() => history.push('/welcome'))
  .catch((err) => console.log('Error loging in', err));


export default function(state = {}, action) {
  switch (action.type) {
    case SET:
      return action.user;
    case REMOVE:
      return {};
    default:
      return {};
  }
}