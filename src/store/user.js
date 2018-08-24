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

export const retrieveLoggedInUser = () => dispatch => 
  axios.get('http://localhost:8080/api/auth') //req.user not persisted

const signIn = (user, method) => dispatch =>
  axios.post(`http://localhost:8080/api/auth/${method}`, user)
  .then(resToData)
  .then(user => {
    localStorage.setItem('current-user', JSON.stringify(user));
    dispatch(setUser(user));
    return user;
  })
  .catch(err => {
    const {data} = err.response;
    dispatch(callActions(data));
  });

export const googleAndWelcome = () => dispatch => 
  axios.get('http://localhost:8080/api/auth/google')
  .then(res => console.log('i fought the law and i got ', res))

export const signUpAndWelcome = user => dispatch =>
  dispatch(signIn(user, 'signUp'))
  .then(user => user ? history.push('/welcome') : null)  //only redirect if user return by signUp

export const logInAndWelcome = user => dispatch =>
  dispatch(signIn(user, 'logIn'))
  .then(user => user ? history.push('/welcome') : null) //only redirect if user return by logIn

export const removeUserThunk = () => dispatch =>
  axios.delete('http://localhost:8080/api/auth')
  .then(() => {
    localStorage.removeItem('current-user');
    dispatch(removeUser());
    dispatch(clearFurbabies());
    dispatch(clearParents());
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