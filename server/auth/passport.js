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
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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
    User.findOne({where: {email: info.email}}) 
    .then(res => {
      if (res === null) {
        User.create(info)
        .then(user => done(null, user)) //send email asking for permission here
      } else {
        const user = res.get();
        if (user.googleId === null) {
          return done(null, false, {flash: `You have previously used ${info.email} to log in to the website with password. Please log in the same way again!`})
        } else if (user.hasAccess === null) {
          return done(null, false, {flash: `You are yet to get access to the website!`})
        } else if (!user.hasAccess) {
          return done(null, false, {flash: `You were previously denied access`});
        } else {
          return done(null, user);
        }
      }
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
      if (userVal.googleId !== null) return done(null, false, { flash: `You have previously used ${userVal.email} to log in with google. Please login with google!`});
      if (userVal.hasAccess === null) return done(null, false, { flash: 'It seems that you don\'t have permission to access the website. Please wait for an email from ForAnimals!'});
      if (userVal.hasAccess === false) return done(null, false, { flash: 'Sorry, you were denied accesss to the website.'});
      const passwordDB = userVal.password;
      if (!bcrypt.compareSync(password, passwordDB)) {
        return done(null, false, { flash: 'Wrong password entered!' })
      } else {
        return done(null, user);
      }
    })
    .catch(done)
  })
)

module.exports = passport;