const router = require('express').Router();
const passport = require('../auth/passport');

router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/verify', function (req, res, next) {
  passport.authenticate('google', {failureFlash: true}, function (err, user, info) {
    if (err) return next(err);
    if (user) {
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.redirect(`${process.env.PROCESS_URL}welcome`);
      })
    } else if (!user) {
      const {flash: {code, flashMsg}} = info;
      return res.redirect(`${process.env.PROCESS_URL}?code=${code}&flashMsg=${flashMsg}`)
    }
  })(req, res, next)
})

module.exports = router;