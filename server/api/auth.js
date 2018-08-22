const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt-nodejs');
const createError = require('../createError');

const resToData = res => res === null ? null : res.data;
const resGet = res => {
  const response = res.get();
  const {id, email, firstName, lastName} = response;
  return {id, email, firstName, lastName};
}

//handleLogIn
router.post('/logIn', function(req, res, next) {
  const {email, password, firstName, lastName} = req.body;
  const inputPW = password;
  delete req.body.password; //delete password
  User.findOne({
    where: { email }
  }) //add statement when user not found
  .then(user => {
    const passwordDB = user.password; //hashed pw in database
    bcrypt.compare(inputPW, passwordDB, function(err, check) {
      if (err) return next(err);
      if (check) return res.json(user);
      console.log('wrong password!'); //add flash
    })
  })
})

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
          console.log('user ', req.user)
          res.json(user); //only send id & email to front end
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

router.delete('/', function (req, res, next) {
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;