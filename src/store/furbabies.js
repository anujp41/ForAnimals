import axios from 'axios';

const CREATE_FURBABY = 'CREATE_FURBABY';
const GET_FURBABIES = 'GET_FURBABIES';
const UPDATE_FOSTER = 'UPDATE_FOSTER';

const initialState = [];

const createFurbaby = furbaby => ({ type: CREATE_FURBABY, furbaby });
const getFurbabies = furbabies => ({ type: GET_FURBABIES, furbabies});
const updateFoster = furbaby => ({ type: UPDATE_FOSTER, furbaby });

export const createFurbabyThunk = furbaby => dispatch =>
  axios.post('http://localhost:8080/api/furbabies', furbaby)
  .then(newFurbaby => dispatch(createFurbaby(newFurbaby.data)))
  .catch(err => console.log(err));

export const getFurbabiesThunk = () => dispatch =>
  axios.get('http://localhost:8080/api/furbabies')
  .then(furbabies => dispatch(getFurbabies(furbabies.data)))
  .catch(err => console.log(err));

export const updateFosterThunk = furbaby => dispatch => 
  axios.put('http://localhost:8080/api/furbabies')
  .then(furbaby => dispatch(updateFoster(furbaby)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FURBABY:
      return [...state, action.furbaby];
    case GET_FURBABIES:
      return action.furbabies;
    case UPDATE_FOSTER:
      return state.forEach(item => {
        if (item.id === action.furbaby.id) {
          item.parentId = action.furbaby.parentId;
        }
      })
    default:
      return state;
  }
}