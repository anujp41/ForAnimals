const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt-nodejs');
const createError = require('../createError');
const passport = require('../auth/passport');

const resToData = res => res === null ? null : res.data;
const resGet = res => {
  const response = res.get();
  const {id, email, firstName, lastName} = response;
  return {id, email, firstName, lastName};
}

//handle requests for check for logged in user
router.post('/', function(req, res, next) {
  console.log('********************************************************');
  console.log('req.sessionId ', req.sessionID)
  // console.log('saved ', req.isAuthenticated())
  console.log('********************************************************');
  res.send(req.user);
})

router.post('/logIn', function(req, res, next) {
  passport.authenticate('local-login', { failureFlash: true }, function(err, user, info) {
      // console.log('*******************************************');
      // console.log('error ', err)
      // console.log('user ', user);
      // console.log('info ', info)
      // console.log('*******************************************');
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
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      console.log('user session created')
      console.log('req.sessionId ', req.sessionID)
      // console.log('user ', req.user)
      // console.log('saved ', req.isAuthenticated())
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      res.json(user);
    })
  })(req, res);
})

/*
//handleLogIn
router.post('/logIn', function(req, res, next) {
  const {email, password} = req.body;
  const inputPW = password;
  delete req.body.password; //delete password
  User.findOne({
    where: { email }
  })
  .then(user => {
    const passwordDB = user.password; //hashed pw in database
    bcrypt.compare(inputPW, passwordDB, function(err, check) {
      if (err) return next(err);
      if (check) {
        const userToSave = resGet(user);
        req.logIn(userToSave, function(err) {
          if (err) return next(err);
  //         console.log('*******************************************');
  // console.log('user ', req.user)
  // console.log('saved ', req.isAuthenticated())
  // console.log('*******************************************');
          res.json(userToSave);
        })
      } else {
        req.flash('pw-wrong', 'Wrong password entered!')
        const error = createError(req.flash('pw-wrong'), 400);
        next(error);
      }
    })
  })
  .catch(err => {
    req.flash('email-not-found', 'Cannot find email address. Are you sure you have an account with us?')
    const error = createError(req.flash('email-not-found'), 400);
    next(error);
  })
})
*/

//handleSignUp
router.post('/signUp', function (req, res, next) {
  // delete req.body.isAdmin; //commented out for no

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

//handle Google SignIn
// router.get('/google', function(req, res, next) {
//   passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'});
// })

// router.get('/google/callback', function(req, res, next) {
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function (req, res) {
//     console.log('request is ', req);
//     res.redirect(`/welcome`);
//   }
// })


// handle LogOut
router.delete('/', function (req, res, next) {
  req.logOut();
  req.session.destroy(function(err) {
    res.sendStatus(204);
  })
});

module.exports = router;