const router = require('express').Router();
const passport = require('../auth/passport');
const createError = require('../createError');

router.get('/', passport.authenticate('google', {scope: 'email'}));

// router.get('/verify',
//   passport.authenticate('google', {failureRedirect: `${process.env.PROCESS_URL}`, successRedirect: `${process.env.PROCESS_URL}welcome`,  failWithError: true, failureFlash: 'Invalid' }),
// )

router.get('/verify', function (req, res, next) {
  passport.authenticate('google', {failureFlash: true}, function (err, user, info) {
    console.log('i have info ', info);
    if (err) return next(err);
    if (user) {
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.redirect(`${process.env.PROCESS_URL}welcome`);
      })
    } else if (!user) {
      req.flash('user-err', info.flash);
      const error = createError(req.flash('user-err'), 400);
      return next(error);
    }
  })(req, res, next)
})

module.exports = router;