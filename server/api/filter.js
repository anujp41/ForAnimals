const router = require('express').Router();
const { FurBabies, Parents } = require('../models');

// Return all furbabies from database
router.get('/:option', (req, res, next) => {
  const { option } = req.params;
  console.log('options is ', option);
  FurBabies.findAll({
    where: { currentStatus: option },
    include: [Parents]
  })
    .then(filterResult => res.json(filterResult))
    .catch(next);
});

module.exports = router;
