import firebase from '../firebase';
const database = firebase.database();

const ASSIGN_CURR_FURBABY = 'ASSIGN_CURR_FURBABY';
const CLEAR_CURR_FURBABY = 'CLEAR_CURR_FURBABY';

const initialState = {};

//function currFurbaby object with attributes that are required for front-end
const addAttributes = furbaby => {
  const age = furbaby.age;
  furbaby.ageYear = age.slice(0, 1);
  furbaby.ageMonth = age.slice(age.indexOf(',')+1, age.indexOf('month')-1).trim();

  furbaby.sexBoolean = furbaby.sex === 'M' ? false : true;

  return furbaby;
}

export const archiveFurbabyThunk = furbaby => dispatch => {
  console.log('about to archive');
  const id = furbaby.id;
  const currTime = new Date().toISOString().slice(0,-5);
  database.ref(id).child(currTime).update(furbaby)
  .then(() => dispatch(clearCurrFurbaby()));
}

export const assignCurrFurbaby = furbaby => ({ type: ASSIGN_CURR_FURBABY, furbaby: addAttributes(furbaby) });
export const clearCurrFurbaby = () => ({ type: CLEAR_CURR_FURBABY });

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSIGN_CURR_FURBABY:
      return action.furbaby;
    case CLEAR_CURR_FURBABY:
      return {};
    default:
      return state;
  }
}