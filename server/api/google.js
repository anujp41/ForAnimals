const router = require('express').Router();
const passport = require('../auth/passport');

router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/verify',
  passport.authenticate('google', { failureRedirect: `${process.env.PROCESS_URL}` }),
  function (req, res) {
    res.redirect(`${process.env.PROCESS_URL}`);
  }
)

module.exports = router;