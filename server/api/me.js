const router = require('express').Router();
const { User, ResetPWLog } = require('../models');
const createError = require('../createError');
const passport = require('../auth/passport');
const { sendPWEmail, sendAccessEmail, sendPermissionEmail, sendDenyEmail } = require('../utils/sendEmail');
const checkCurrAccess = require('../utils/checkCurrAccess');
const { Op } = require('sequelize');

const resGet = res => {
  if (res !== null) {
    const {id, email, firstName, lastName, googleId} = res.get();
    return {id, email, firstName, lastName, googleId};
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
      const {flash: {code, flashMsg}} = info;
      req.flash('user-err', flashMsg);
      const error = createError(req.flash('user-err'), code);
      return next(error);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.json(user);
      })
    }
  })(req, res, next);
})

router.post('/signUp', function (req, res, next) {
  const {email} = req.body;
  User.findOne({where: { email }})
  .then(resGet)
  .then(user => {
    if (user === null) {
      User.create(req.body)
      .then(resGet)
      .then(user => {
        const {id, email, firstName, lastName} = user;
        sendAccessEmail(id, email, firstName, lastName)
        .then(email => res.json(email))
      })
    } else {
      const googleId = user.googleId;
      if (googleId) {
        req.flash('google-signUp', `${email} was previously used to sign up via Google. Please log in with Google again!`)
        const error = createError(req.flash('google-signUp'), 400);
        return next(error);
      } else {
        req.flash('email-exists', `There is an existing account under ${email}. Please login or change your password if forgotten!`)
        const error = createError(req.flash('email-exists'), 400);
        return next(error);
      }
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
      req.flash('email-not-found', `Cannot locate ${email}. Please try entering email again!`)
      const error = createError(req.flash('email-not-found'), 400);
      next(error);
      return;
    } else if (resEmail.googleId !== null) {
      req.flash('google-login', `You have signed in with Google using ${resEmail.email}. Please try singing in with google again!`);
      const error = createError(req.flash('google-login'), 400);
      next(error);
    } else {
      const {email, firstName} = resEmail;
      sendPWEmail(email, firstName)
      .then(emailSent => {
        emailSent.expiresOn = new Date().getTime()+(1000 * 60 * 60 * 24); //token expires in 24 hours
        ResetPWLog.create(emailSent)
        .then(() => {
          res.status(401);
          return res.json(email);
        })
      })
      .catch(next);
    } 
  })
  .catch(next)
})

router.post('/checkToken', function(req, res, next) {
  const {resetToken} = req.body;
  ResetPWLog.findOne({
    where: {resetToken}
  })
  .then(found => {
    if (found === null) return res.send('Not Found');
    const {expiresOn, tokenUsed} = found.get();
    if (tokenUsed) return res.send('Token Used')
    const nowTime = new Date();
    const tokenExpired = nowTime.getTime() < expiresOn.getTime();
    res.send(tokenExpired ? 'Not Expired' : 'Expired');
  })
})

router.post('/resetPW', function(req, res, next) {
  const { resetToken, password } = req.body;
  ResetPWLog.update({
    tokenUsed: true,
    tokenUsedOn: Date.now()
  },{
    where: {resetToken},
    returning: true
  }).then(([row, [updatedToken]]) => {
    const {email} = updatedToken.get();
    User.update({
      password
    },{
        where: {
          email: {
            [Op.eq]: email
          }
        },
        returning: true
      })
      .then(([rowUpdated, [updatedUserDetail]]) => {
        const user = resGet(updatedUserDetail);
        req.logIn(user, function(err) {
          if (err) return next(err);
          const {id, email, firstName, lastName} = user;
          res.json({id, email, firstName, lastName});
        })
      })
  }).catch(next);
})

router.get(`/userAccess/:id`, checkCurrAccess, function(req, res, next) {
  const { id } = req.params;
  const access = req.query.access === 'true';
  const {firstName, lastName, email} = res.locals;
  User.update({
    hasAccess: access,
    accessActionDate: new Date()
    }, {
      where: {id}
    }).then(() => {
      if (access) {
        sendPermissionEmail(email, firstName);
        return res.json(`${firstName} ${lastName} (${email}) was successfully granted access. Thank you for your prompt response!`)
      } else if (!access){
        sendDenyEmail(email, firstName);
        return res.json(`${firstName} ${lastName} (${email}) was successfully denied access. Thank you for your prompt response!`)
      }
    })
    .catch(next);
});

// handle LogOut
router.delete('/', function (req, res, next) {
  req.logOut();
  req.session.destroy(function(err) {
    res.statusMessage = 'Successfully logged out!';
    res.sendStatus(204);
  })
});

module.exports = router;