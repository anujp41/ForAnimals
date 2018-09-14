const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(user => {
    const userVal = user.get();
    const {id, email, firstName, lastName} = userVal;
    done(null, {id, email, firstName, lastName});
  })
  .catch(done);
});

// used for google strategy
passport.use('google',
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

//used for local strategy
passport.use('local-login', new LocalStrategy({usernameField: 'email'},
  function(username, password, done) {
    User.findOne({
      where: {email: username}
    })
    .then(user => {
      if (user === null) {
        return done(null, false, { flash: 'Cannot find email address. Are you sure you have an account with us?' })
      }
      const userVal = user.get();
      if (userVal.hasApproval === false) return done(null, false, { flash: "It seems that you don't have permission to access the website. Please wait for an email from ForAnimals!"});
      const passwordDB = userVal.password;
      if (!bcrypt.compareSync(password, passwordDB)) {
        return done(null, false, { flash: 'Wrong password entered!' })
      }
      // return done(null, user);
      const {id, email, firstName, lastName} = userVal;
      return done(null, {id, email, firstName, lastName});
    })
    .catch(done)
  })
)

module.exports = passport;