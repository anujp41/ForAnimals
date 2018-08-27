const router = require('express').Router();

router.use('/furbabies', require('./furbabies'));
router.use('/furbabyDetail', require('./furbabyDetail'));
router.use('/filter', require('./filter'));
router.use('/parents', require('./parents'));
router.use('/auth', require('../auth/me'));
router.use('/google', require('../auth/google'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});

module.exports = router;