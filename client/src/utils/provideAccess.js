import axios from 'axios';

export default provideAccess;

/**
 * @param string id - ide representing the user who should be provide with access
 */

function provideAccess(params, query) {
  return axios.get(`/api/auth/${params}/${query}`)
}