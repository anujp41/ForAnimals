import axios from 'axios';

const GET_SORT = 'GET_SORT';
const REMOVE_SORT = 'REMOVE_SORT';

const initialState = [];

const getSort = furbabies => ({ type: GET_SORT, furbabies });
export const removeSort = () => ({ type: REMOVE_SORT });

export const getSortThunk = (sortCol, order) => dispatch =>
  axios
    .get(`/api/sort/${sortCol}/${order}`)
    .then(result => result.data)
    .then(sortResult => dispatch(getSort(sortResult)))
    .catch(err => console.log(err));

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SORT:
      return action.furbabies;
    case REMOVE_SORT:
      return initialState;
    default:
      return state;
  }
}
