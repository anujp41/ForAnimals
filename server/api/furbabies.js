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
  .then(furbaby => res.json(furbaby))
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
  FurBabies.update( furbaby, {
    where: { id: furbaby.id },
    returning: true,
    individualHooks: true
  })
  .then(([updatedRow, [updatedFurbaby]]) => {
    const {adoptedName, ageYYMM, birthDate, breed, coatColor, currentStatus, gender, id, intakeDate, intakeDateStr, parentId, photoUrl, shelterName} = updatedFurbaby.get();
    return {adoptedName, ageYYMM, birthDate, breed, coatColor, currentStatus, gender, id, intakeDate, intakeDateStr, parentId, photoUrl, shelterName};
  })
  .then(furbaby => {
    const {parentId} = furbaby;
    if (parentId) {
      Parents.findById(parentId)
      .then(parent => parent.checkFoster())
      .then(parent => res.json({...furbaby, parent }))
    } else {
      res.json({...furbaby})
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