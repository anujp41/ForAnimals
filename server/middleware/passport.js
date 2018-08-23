const passport = require('passport');
const User = require('../models');
const router = require('express').Router();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(user => done(null, user))
  // .then(user => {
  //   console.log('deserelizaed ', user);
  //   return done(null, user);
  // })
  .catch(done);
});

module.exports = router;