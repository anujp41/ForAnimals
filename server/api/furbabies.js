const sequelize = require('sequelize');
const router = require('express').Router();
const { FurBabies, Parents } = require('../models');

// Return all furbabies from database
router.get('/:index', (req, res, next) => {
  const {index} = req.params;
  FurBabies.findAll({
    attributes: ['id', 'adoptedName', 'shelterName', 'birthDate', 'breed', 'gender', 'coatColor', 'intakeDate', 'parentId', 'photoUrl', 'currentStatus'],
    include: [Parents],
    offset: index,
    limit: 25, // 25 furbabies pulled at given time
    order: [[sequelize.col('furbaby.createdAt'), 'DESC']] //order furbabies by createdDate
  })
  .then(newBabies => res.json(newBabies))
  .catch(next);
})

//Creates new entries for kitties
router.post('/', (req, res, next) => {
  FurBabies.create(req.body)
  .then(newBabies => newBabies.get())
  .catch(next);
})

//Update existing cats
router.put('/', (req, res, next) => {
  const furbaby = req.body;
  return FurBabies.update( furbaby, {
    where: { id: furbaby.id },
    individualHooks: true
  })
  .then(([updatedRow, [updatedFurbaby]]) => updatedFurbaby.get())
  .then(furbaby => {
    const {parentId, ...furbabyDetail} = furbaby;
    if (parentId) {
      Parents.findById(parentId)
      .then(parent => parent.get())
      .then(parent => res.json({...furbabyDetail, parent}))
    } else {
      res.json({...furbabyDetail})
    }
  })
  .catch(next);
})

//Delete cats
router.delete("/:catId", (req, res, next) => {
  let id = req.params.catId;
  FurBabies.destroy({ where: { id } })
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;