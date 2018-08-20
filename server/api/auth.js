const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt-nodejs');
const passport_local = require('../auth/local');

const resToData = res => res === null ? null : res.data;
const resGet = res => res.get();

//handleLogIn
router.post('/logIn', function(req, res, next) {
  const {email, password, firstName, lastName} = req.body;
  const inputPW = password;
  delete req.body.password; //delete password
  User.findOne({
    where: { email },
    // attributes: ['id', 'password']
  })
  // .then(resGet)
  .then(user => {
    const passwordDB = user.password; //hashed pw in database
    bcrypt.compare(inputPW, passwordDB, function(err, check) {
      if (err) return next(err);
      res.json(user);
    })
  })
})

//handleSignUp
router.post('/signUp', function (req, res, next) {
  // delete req.body.isAdmin; //commented out for no

  const {email, password, firstName, lastName} = req.body;
  User.findOne({where: { email }})
  .then(resToData)
  .then(user => {
    if (user === null) {
      User.create(req.body)
      .then(user => {
        req.logIn(user, function(err) {
          if (err) return next(err);
          res.json(user);
        })
      })
    } else {
      //send flash msg that user already created
      console.log('you already have an account with this email!')
    }
  })
});

router.delete('/', function (req, res, next) {
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;