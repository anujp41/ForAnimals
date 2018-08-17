const sequelize = require('sequelize');
const router = require('express').Router();
const { User } = require('../models');

//handleSignUp
router.post('/', function (req, res, next) {
  // delete req.body.isAdmin; //commented out for no
  console.log('creating: ', req.body)

  User.findOrCreate({
    where: req.body
  })
  .spread((user, created) => {
    if (created) { // if created is true, then user was created
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
    } else {
      res.sendStatus(401); //meaning user is in the system & cannot sign-up
    }
  });
});

router.delete('/', function (req, res, next) {
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;