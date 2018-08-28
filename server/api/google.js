const router = require('express').Router();
const passport = require('../auth/passport');

router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/verify',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  function (req, res) {
    res.redirect('http://localhost:3000/welcome');
  }
)

module.exports = router;