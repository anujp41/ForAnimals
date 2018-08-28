const router = require('express').Router();

router.use('/furbabies', require('./furbabies'));
router.use('/furbabyDetail', require('./furbabyDetail'));
router.use('/filter', require('./filter'));
router.use('/parents', require('./parents'));
router.use('/auth', require('./me'));
router.use('/google', require('./google'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});

module.exports = router;