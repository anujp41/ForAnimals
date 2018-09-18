const SET_MESSAGE = 'SET_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

const removeMsg = () => ({ type: REMOVE_MESSAGE });
const setMsg = msg => ({ type: SET_MESSAGE, msg });

export default function(state = [], action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.msg;
    case REMOVE_MESSAGE:
      return [];
    default:
      return state;
  }
}

export const callActions = msg => dispatch => {
  const numWords = msg.match(/([\s]+)/g).length+1;
  const msgTime = Math.max(2000, numWords*(60/250)*1000);
  dispatch(setMsg(msg));
  setTimeout(() => dispatch(removeMsg()), msgTime);
}