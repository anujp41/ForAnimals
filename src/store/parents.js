import axios from 'axios';

const CREATE_PARENT = 'CREATE_PARENT';
const GET_PARENTS = 'GET_PARENTS';
const NEW_PARENT = 'NEW_PARENT';

const initialState = {};

const createParent = parent => ({ type: CREATE_PARENT, parent });
const getParents = parents => ({ type: GET_PARENTS, parents });
const newParent = parent => ({ type: NEW_PARENT, parent });

export const createParentThunk = parent => dispatch => 
  axios.post('http://localhost:8080/api/parents', parent)
  .then(parent => dispatch(newParent(parent.data)))
  .catch(err => console.log(err));

export const getParentsThunk = () => dispatch =>
  axios.get('http://localhost:8080/api/parents')
  .then(parents => dispatch(getParents(parents.data)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PARENT:
      return [...state, action.parent];
    case GET_PARENTS:
      return action.parents;
    case NEW_PARENT: 
      return action.parent;
    default:
      return state;
  }
}