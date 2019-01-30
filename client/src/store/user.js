import axios from 'axios';
import history from '../history';
import { callActions } from './flashMsg';
import { clearFurbabies, clearParents} from './index';

const SET = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

export const setUser = user => ({ type: SET, user });
const removeUser = () => ({ type: REMOVE });

//helper function
const resToData = res => res.data;

axios.defaults.withCredentials = true;

export const retrieveLoggedInUser = () => dispatch => 
  axios.get('/api/auth/')
  .then(resToData)
  .then(user => {
    if (user.hasOwnProperty('id')) {
      localStorage.setItem('current-user', JSON.stringify(user));
      dispatch(setUser(user));
      history.push('/welcome');
    }
  })

const logIn = (user, method) => dispatch => 
  axios.post(`/api/auth/${method}`, user)
  .then(resToData)
  .then(user => {
    console.log('i got  ', user)
    localStorage.setItem('current-user', JSON.stringify(user));
    dispatch(setUser(user));
    return user;
  })
  .catch(err => dispatch(callActions([err.response.status, err.response.data])));

export const forgotPW = email => dispatch =>
  axios.post('/api/auth/forgotPW', email)
  .then(email => dispatch(callActions([email.status, `Please check your inbox at ${email.data} for email from ForAnimals. Remember to change your password within 24 hours!`])))
  .catch(err => dispatch(callActions([err.response.status, err.response.data])))

export const signUp = user => dispatch =>
  axios.post(`/api/auth/signUp`, user)
  .then(email => dispatch(callActions([email.status, `Congratulations, you have created an account with For Animals under ${email.data}. Watch for an email from us that gives you access!`])))
  .catch(err => dispatch(callActions([err.response.status, err.response.data])));

export const logInAndWelcome = user => dispatch =>
  dispatch(logIn(user, 'logIn'))
  .then(user => user ? history.push('/welcome') : null) //only redirect if user return by logIn

export const removeUserThunk = () => dispatch =>
  axios.delete('/api/auth')
  .then(response => {
    localStorage.removeItem('current-user');
    dispatch(removeUser());
    dispatch(clearFurbabies());
    dispatch(clearParents());
    dispatch(callActions([response.status, response.statusText]));
    history.push('/')
  })
  .catch(err => console.error('Error removing user', err));


export default function(state = {}, action) {
  switch (action.type) {
    case SET:
      return action.user;
    case REMOVE:
      return {};
    default:
      return state;
  }
}