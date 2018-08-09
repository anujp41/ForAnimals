const router = require('express').Router();
const { FurBabies, Parents } = require('../models');

// Return all furbabies from database
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  FurBabies.findOne({
    where: { id },
    include: [Parents]
  })
  .then(furbaby => res.json(furbaby.get()))
  .catch(next);
})

module.exports = router;