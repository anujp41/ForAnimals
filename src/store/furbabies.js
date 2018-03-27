import axios from 'axios';

const CREATE_FURBABY = 'CREATE_FURBABY';

const initialState = {};

const createFurbaby = furbaby => ({ type: CREATE_FURBABY, furbaby });

export const createFurbabyThunk = furbaby => dispatch =>
  axios.post('http://localhost:8080/api/furbabies', furbaby)
  .then(newFurbaby => dispatch(createFurbaby(newFurbaby)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FURBABY:
      return action.furbaby;
    default:
      return state;
  }
}