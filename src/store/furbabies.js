import axios from 'axios';

const CREATE_FURBABY = 'CREATE_FURBABY';
const GET_FURBABIES = 'GET_FURBABIES';
const UPDATE_FOSTER = 'UPDATE_FOSTER';

const initialState = [];

const createFurbaby = furbaby => ({ type: CREATE_FURBABY, furbaby });
const getFurbabies = furbabies => ({ type: GET_FURBABIES, furbabies});
const updateFoster = furbaby => ({ type: UPDATE_FOSTER, furbaby });

export const createFurbabyThunk = furbaby => dispatch => {
  furbaby.arrivedDate = new Date(furbaby.arrived+'T00:00:00');
  return axios.post('http://localhost:8080/api/furbabies', furbaby)
  .then(newFurbaby => newFurbaby.data)
  .then(newKitty => {
    newKitty.arrivedDate = new Date(newKitty.arrivedDate);
    return newKitty;
  })
  .then(newFurbaby => dispatch(createFurbaby(newFurbaby)))
  .catch(err => console.log(err));
}

export const getFurbabiesThunk = () => dispatch =>
  axios.get('http://localhost:8080/api/furbabies')
  .then(furbabies => furbabies.data)
  .then(furbabiesArr => furbabiesArr.map(furbaby => {
    furbaby.arrivedDate = new Date(furbaby.arrivedDate);
    return furbaby;
  }))
  .then(furbabies => dispatch(getFurbabies(furbabies)))
  .catch(err => console.log(err));

export const updateFosterThunk = furbaby => dispatch => 
  axios.put('http://localhost:8080/api/furbabies', furbaby)
  .then(furbaby => dispatch(updateFoster(furbaby)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FURBABY:
      return [...state, action.furbaby];
    case GET_FURBABIES:
      return action.furbabies;
    case UPDATE_FOSTER:
      state.forEach(item => {
        if (item.id === action.furbaby.id) {
          item.parentId = action.furbaby.parentId;
        }
      });
      return state;
    default:
      return state;
  }
}