const router = require('express').Router();
const { User } = require('../models');
const createError = require('../createError');
const passport = require('../auth/passport');

const resToData = res => res === null ? null : res.data;
const resGet = res => {
  if (res !== null) {
    const response = res.get();
    const {id, email, firstName, lastName} = response;
    return {id, email, firstName, lastName};
  } else {
    return null;
  }
}

//handle requests for check for logged in user
router.get('/', function(req, res, next) {
  res.send(req.user);
})

//local login using passport authenticate with custom callback
router.post('/logIn', function(req, res, next) {
  passport.authenticate('local-login', { failureFlash: true }, function(err, user, info) {
    if (err) {
      req.flash('srvr-err', 'Server Error. Please try again!');
      const error = createError(req.flash('srvr-err'), 400);
      return next(error);
    }
    if (!user) {
      req.flash('user-err', info.flash);
      const error = createError(req.flash('user-err'), 400);
      return next(error);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      res.json(user);
    })
  })(req, res);
})

//handleSignUp -> using req.logIn
router.post('/signUp', function (req, res, next) {

  const {email} = req.body;
  User.findOne({where: { email }})
  .then(resToData)
  .then(user => {
    if (user === null) {
      User.create(req.body)
      .then(resGet)
      .then(user => {
        req.logIn(user, function(err) {
          if (err) return next(err);
          res.json(user);
        })
      })
    } else {
      req.flash('email-exists', 'Account exists under this email. Please log in instead!')
      const error = createError(req.flash('email-exists'), 400);
      next(error)
    }
  })
  .catch(err => next(err));
});

router.post('/forgotPW', function(req, res, next) {

  const {email} = req.body;
  User.findOne({ where: { email }})
  .then(resGet)
  .then(resEmail => {
    if (resEmail === null) {
      req.flash('email-not-found', `Cannot locate ${email}. Please try again!`)
      const error = createError(req.flash('email-not-found'), 400);
      next(error);
      return;
    } else {
      const {email} = resEmail;
      res.json(email);
    }
  })
  .catch(next)
})

// handle LogOut
router.delete('/', function (req, res, next) {
  req.logOut();
  req.session.destroy(function(err) {
    res.sendStatus(204);
  })
});

module.exports = router;