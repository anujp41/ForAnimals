/**
 * @param {!string} column - Name of column in database
 * @param {!string} sortOption - DESC/ASC depending on the sort order
 */

const router = require('express').Router();
const { FurBabies, Parents } = require('../models');

router.get('/:column/:sortOption', (req, res, next) => {
  const { column, sortOption } = req.params;
  FurBabies.findAll({
    order: [[column, sortOption]],
    include: [Parents]
  })
    .then(sortResult => res.json(sortResult))
    .catch(next);
});

module.exports = router;
