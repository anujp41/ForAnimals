import axios from 'axios';

/**
 * @param string password - takes new pw entered by user and save to db; not done thru store as this info is not ingested by store
 */

export default resetPW;

function resetPW(resetToken, password) {
  return axios.post('/api/auth/resetPW', { resetToken, password })
  .then(res => res.data)
}