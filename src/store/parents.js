import axios from 'axios';

const CREATE_PARENT = 'CREATE_PARENT';

const initialState = {};

const createParent = parent => ({ type: CREATE_PARENT, parent });

export const createParentThunk = parent => dispatch =>
  axios.post('http://localhost:8080/api/parents', parent)
  .then(newParent => dispatch(createParent(newParent)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PARENT:
      return action.parent;
    default:
      return state;
  }
}