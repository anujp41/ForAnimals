import axios from 'axios';
import history from '../history';
import { callActions } from './flashMsg';

const SET = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

const setUser = user => ({ type: SET, user });
const removeUser = () => ({ type: REMOVE });

//helper function
const resToData = res => res.data;

const signIn = (user, method) => dispatch =>
  axios.post(`http://localhost:8080/api/auth/${method}`, user)
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
  dispatch(signIn(user, 'signUp'))
  .then(user => user ? history.push('/welcome') : null)  //only redirect if user return by signUp

export const removeUserThunk = () => dispatch =>
  axios.delete('http://localhost:8080/api/auth')
  .then(() => {
    dispatch(removeUser())
    history.push('/')
  })
  .catch(err => console.error('Error removing user', err));

export const logInAndWelcome = user => dispatch =>
  dispatch(signIn(user, 'logIn'))
  .then(user => user ? history.push('/welcome') : null) //only redirect if user return by logIn


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