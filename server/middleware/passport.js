const passport = require('passport');
const User = require('../models');
const router = require('express').Router();

router.use(passport.initialize());
router.use(passport.session());

module.exports = router;