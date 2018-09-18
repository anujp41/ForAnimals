const SET_MESSAGE = 'SET_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const removeMsg = () => ({ type: REMOVE_MESSAGE });
const setMsg = msg => ({ type: SET_MESSAGE, msg });

const initialState = {code: null, msgStmt: ''};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.msg;
    case REMOVE_MESSAGE:
      return initialState;
    default:
      return state;
  }
}

export const callActions = msg => dispatch => {
  const code = msg[0] === 400 ? 'error' : msg[0] === 200 ? 'success' : 'info';
  const msgStmt = msg[1];
  const numWords = msgStmt.match(/([\s]+)/g).length+1;
  const msgTime = Math.max(2000, numWords*(60/250)*1000);
  dispatch(setMsg({code, msgStmt}));
  setTimeout(() => dispatch(removeMsg()), msgTime);
}