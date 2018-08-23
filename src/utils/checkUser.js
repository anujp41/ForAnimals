export default checkUser;

/**
 * @param checkUser function - checks for logged in user in localStorage, then redux, and then back-end
 */

function checkUser() {
  const currUser = JSON.parse(localStorage.getItem('current-user'));
  if (currUser.hasOwnProperty('id')) return true;
}