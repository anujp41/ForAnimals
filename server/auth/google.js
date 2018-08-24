const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models');

// configuring the strategy (credentials + verification callback)
passport.use(
  new GoogleStrategy({
    clientID: '38981289948-15f8a8ir6scsbi31if0aqehg28adu0dd.apps.googleusercontent.com',
    clientSecret: 'Pez-NK_dtXle9d1XWq6U2XjP',
    callbackURL: '/api/google/verify'
  },
  function (token, refreshToken, profile, done) {
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .spread(function (user) {
      return done(null, user);
    })
    .catch(done);
  })
);

router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/verify',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  function (req, res) {
    console.log('request is ', req);
    res.redirect(`/welcome`);
  }
)

module.exports = router;