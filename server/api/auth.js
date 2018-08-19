// const sequelize = require('sequelize');
// const router = require('express').Router();
// const { User } = require('../models');

// //handleSignUp
// router.post('/', function (req, res, next) {
//   // delete req.body.isAdmin; //commented out for no

//   User.findOrCreate({
//     where: {
//       email: req.body.email
//     }
//   })
//   .spread((user, created) => {
//     console.log('created ', created)
//     if (created) { // if created is true, then user was created
//       req.logIn(user, function (err) {
//         if (err) return next(err);
//         res.json(user);
//       });
//     } else {
//       // console.log('user exists')
//       // req.flash('info', 'Already have an account. Please log-in!')
//       res.sendStatus(401); //meaning user is in the system & cannot sign-up
//     }
//   });
// });

// router.delete('/', function (req, res, next) {
//   req.logOut();
//   res.sendStatus(204);
// });

// module.exports = router;

const router = require('express').Router();
const { User } = require('../models');
const passport_local = require('../auth/local');

// passport.authenticate('local', (err, user, info) => {
//   if (err) { handleResponse(res, 500, 'error'); }
//   if (!user) { handleResponse(res, 404, 'User not found'); }
//   if (user) {
//     req.logIn(user, function (err) {
//       if (err) { handleResponse(res, 500, 'error'); }
//       handleResponse(res, 200, 'success');
//     });
//   }
// })(req, res, next);

//handleSignUp
router.post('/', function (req, res, next) {
  console.log(req.body)
  passport_local.authenticate('local', {session: false}, (err, user) => {
    console.log('authenticating')
    console.log('user', user);
    if(err) {
      console.log("Error1");
      return next(err)}
    if(!user){
      console.log("Error2");
      return res.json(401, {error: 'Auth Error!'});
    }
    console.log("Error3");
  })(req, res, next);
});

router.delete('/', function (req, res, next) {``
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;