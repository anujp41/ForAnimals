const router = require('express').Router();

router.use('/furbabies', require('./furbabies'));
router.use('/filter', require('./filter'));
router.use('/parents', require('./parents'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});

module.exports = router;