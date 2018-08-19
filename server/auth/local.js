const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(username, password, done) {
    console.log('here is ', username)
    User.findOne({ username: email }, function(err, user) {
      if (err) { 
        console.log('got error!');
        return done(err); 
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;