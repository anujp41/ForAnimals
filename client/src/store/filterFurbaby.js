import axios from 'axios';

const GET_FILTER = 'GET_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';

const initialState = [];

const getFilter = furbabies => ({ type: GET_FILTER, furbabies });
export const removeFilter = furbaby => ({ type: REMOVE_FILTER });

export const getFilterThunk = filterOption => dispatch =>
  axios
    .get(`/api/filter/${filterOption}`)
    .then(result => result.data)
    .then(filterResults => dispatch(getFilter(filterResults)))
    .catch(err => console.log(err));

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILTER:
      return action.furbabies;
    case REMOVE_FILTER:
      return initialState;
    default:
      return state;
  }
}
