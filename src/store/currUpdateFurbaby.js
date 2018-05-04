const ASSIGN_CURR_FURBABY = 'ASSIGN_CURR_FURBABY';
const CLEAR_CURR_FURBABY = 'CLEAR_CURR_FURBABY';

const initialState = {};

export const assignCurrFurbaby = furbaby => ({ type: ASSIGN_CURR_FURBABY, furbaby });
export const clearCurrFurbaby = () => ({ type: CLEAR_CURR_FURBABY });

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSIGN_CURR_FURBABY:
      return action.furbaby;
    case CLEAR_CURR_FURBABY:
      return {};
    default:
      return state;
  }
}