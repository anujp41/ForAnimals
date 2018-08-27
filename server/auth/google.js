const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(user => {
    const userVal = user.get();
    const {id, email, firstName, lastName} = userVal;
    return done(null, {id, email, firstName, lastName})
  })
  .catch(done);
});

// configuring the strategy (credentials + verification callback)
passport.use(
  new GoogleStrategy({
    clientID: '38981289948-15f8a8ir6scsbi31if0aqehg28adu0dd.apps.googleusercontent.com',
    clientSecret: 'Pez-NK_dtXle9d1XWq6U2XjP',
    callbackURL: '/api/google/verify'
  },
  function (token, refreshToken, profile, done) {
    const info = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      photoURL: profile.photos && profile.photos[0].value,
      googleId: profile.id
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
    res.redirect(`http://localhost:3000/`);
  }
)

module.exports = router;