import axios from 'axios';

const CREATE_FURBABY = 'CREATE_FURBABY';
const GET_FURBABIES = 'GET_FURBABIES';
const UPDATE_FURBABY = 'UPDATE_FURBABY';
const DELETE_FURBABY = 'DELETE_FURBABY';
const CLEAR_FURBABIES = 'CLEAR_FURBABIES';

const initialState = [];

const createFurbaby = furbaby => ({ type: CREATE_FURBABY, furbaby });
const getFurbabies = furbabies => ({ type: GET_FURBABIES, furbabies });
const updateFurbaby = (furbaby, index) => ({
  type: UPDATE_FURBABY,
  furbaby,
  index
});
const deleteFurbaby = index => ({ type: DELETE_FURBABY, index });
export const clearFurbabies = () => ({ type: CLEAR_FURBABIES });

export const createFurbabyThunk = furbaby => dispatch =>
  axios
    .post('/api/furbabies', furbaby)
    .then(newFurbaby => {
      return newFurbaby.data;
    })
    .then(newKitty => newKitty)
    .then(newFurbaby => dispatch(createFurbaby(newFurbaby)))
    .catch(err => console.log(err));

export const getFurbabiesThunk = (idx = 0) => dispatch =>
  axios
    .get(`/api/furbabies/${idx}`)
    .then(furbabies => furbabies.data)
    .then(furbabies => dispatch(getFurbabies(furbabies)))
    .catch(err => console.log(err));

export const updateFurbabyThunk = (furbaby, index) => dispatch =>
  axios
    .put('/api/furbabies', furbaby)
    .then(updatedFurbaby => dispatch(updateFurbaby(updatedFurbaby.data, index)))
    .catch(err => console.log(err));

export const deleteFurbabyThunk = (id, arrIndex) => dispatch =>
  axios
    .delete(`/api/furbabies/${id}`)
    .then(() => dispatch(deleteFurbaby(arrIndex)))
    .catch(err => console.log(err));

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_FURBABY:
      // return [...state, action.furbaby];
      return state;
    case GET_FURBABIES:
      return [...state, ...action.furbabies];
    case UPDATE_FURBABY:
      const { furbaby, index } = action;
      state.splice(index, 1, furbaby);
      console.log('new state ', Object.assign([], state));
      return Object.assign([], state);
    case DELETE_FURBABY:
      state.splice(action.index, 1);
      return [...state];
    case CLEAR_FURBABIES:
      return initialState;
    default:
      return state;
  }
}
