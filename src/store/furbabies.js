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
  .then(newFurbaby => newFurbaby.data)
  .then(newKitty => {
    newKitty.arrivedDate = new Date(newKitty.arrivedDate);
    return newKitty;
  })
  .then(newFurbaby => dispatch(createFurbaby(newFurbaby)))
  .catch(err => console.log(err));

export const getFurbabiesThunk = (idx = 0) => dispatch => 
  axios.get(`http://localhost:8080/api/furbabies/${idx}`)
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

export const deleteFurbabyThunk = id => dispatch =>
  axios.delete(`http://localhost:8080/api/furbabies/${id}`)

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FURBABY:
      return [...state, action.furbaby];
    case GET_FURBABIES:
      return [...state, ...action.furbabies];
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