export default compObj;

/**
 * @param {object} props - Furbaby Details received from backend database
 * @param {object} currState - Furbaby Details after update
 */

function compObj(props, currState) {
  const result = {};
  for (let key in props) {
    if (props[key] && currState[key]) {
      const propVal = JSON.stringify(props[key]).toLowerCase();
      const stateVal = JSON.stringify(currState[key]).toLowerCase();
      if (propVal !== stateVal) {
        result[key] = props[key];
      }
    }
  }
  return result;
}