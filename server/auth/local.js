const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(new LocalStrategy(
	{
		usernameField: 'email' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
));

passport.use('local-signup',new LocalStrategy(
	{
		usernameField: 'email' // not necessary, DEFAULT
	},
	function(email, password, done) {
    console.log('searching: ',email);
		User.findOne({ 'email': email }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
));

module.exports = passport;