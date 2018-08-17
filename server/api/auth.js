const sequelize = require('sequelize');
const router = require('express').Router();
const { User } = require('../models');

//handleSignUp
router.post('/', function (req, res, next) {
  // delete req.body.isAdmin; //commented out for no

  User.findOrCreate({
    where: {
      email: req.body.email
    }
  })
  .spread((user, created) => {
    console.log('created ', created)
    if (created) { // if created is true, then user was created
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
    } else {
      // console.log('user exists')
      // req.flash('info', 'Already have an account. Please log-in!')
      res.sendStatus(401); //meaning user is in the system & cannot sign-up
    }
  });
});

router.delete('/', function (req, res, next) {
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;