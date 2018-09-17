const router = require('express').Router();
const passport = require('../auth/passport');
const createError = require('../createError');
const checkCurrAccess = require('../utils/checkCurrAccess');

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
      // return res.redirect('/')
      req.flash('user-err', info.flash);
      const error = createError(req.flash('user-err'), 400);
      return next(error);
    }
  })(req, res, next)
})

module.exports = router;