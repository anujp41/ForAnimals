const router = require('express').Router();
const passport = require('../auth/passport');

console.log('my url is ', process.env.PROCESS_URL)

router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/verify',
  passport.authenticate('google', { failureRedirect: `${process.env.PROCESS_URL}` }),
  function (req, res) {
    console.log('redirecting to ', `${process.env.PROCESS_URL}welcome`);
    res.redirect(`${process.env.PROCESS_URL}welcome`);
  }
)

module.exports = router;