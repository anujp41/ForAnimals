import axios from 'axios';

const CREATE_PARENT = 'CREATE_PARENT';
const GET_PARENTS = 'GET_PARENTS';
const CLEAR_PARENTS = 'CLEAR_PARENTS';

const initialState = [];

const createParent = parent => ({ type: CREATE_PARENT, parent });
const getParents = parents => ({ type: GET_PARENTS, parents });
export const clearParents = () => ({ type: CLEAR_PARENTS })

export const createParentThunk = parent => dispatch => 
  axios.post('/api/parents', parent)
  .then(parent => dispatch(createParent(parent.data)))
  .catch(err => console.log(err));

export const getParentsThunk = () => dispatch =>
  axios.get('/api/parents')
  .then(parents => dispatch(getParents(parents.data)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PARENT:
      return [...state, action.parent];
    case GET_PARENTS:
      return action.parents;
    case CLEAR_PARENTS:
      return {};
    default:
      return state;
  }
}