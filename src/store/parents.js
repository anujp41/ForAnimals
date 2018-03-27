import axios from 'axios';

const CREATE_PARENT = 'CREATE_PARENT';
const GET_PARENTS = 'GET_PARENTS';

const initialState = {};

const createParent = parent => ({ type: CREATE_PARENT, parent });
const getParents = parents => ({ type: GET_PARENTS, parents });

export const createParentThunk = parent => dispatch =>
  axios.post('http://localhost:8080/api/parents', parent)
  .then(newParent => dispatch(createParent(newParent)))
  .catch(err => console.log(err));

export const getParentsThunk = () => dispatch =>
  axios.get('http://localhost:8080/api/parents')
  .then(parents => dispatch(getParents(parents.data)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PARENT:
      return action.parent;
    case GET_PARENTS:
      return action.parents;
    default:
      return state;
  }
}