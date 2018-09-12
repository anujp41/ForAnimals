import axios from 'axios';

/**
 * @param string token - uuid token that checks db to see if token is valid
 */

export default checkToken;

function checkToken(token) {
  return axios.post('/api/auth/checkToken', token)
  .then(res => res.data)
}  