const router = require('express').Router();
const { FurBabies, Parents } = require('../models');

// Return all furbabies from database
router.get('/:index', (req, res, next) => {
  const {index} = req.params;
  FurBabies.findAll({
    include: [Parents],
    offset: index,
    limit: 25
  })
  .then(newBabies => res.json(newBabies))
  .catch(next);
})

//Creates new entries for kitties
router.post('/', (req, res, next) => {
  FurBabies.create(req.body)
  .then(newBabies => newBabies.dataValues)
  .then(newBaby => {
    //sets age in newBaby
    const currDate = new Date().getTime();
    const birthDate = newBaby.birthDate;
    const ageMS = currDate - birthDate;
    const yearMS = 3.154e+10;
    const monthMS = 2.628e+9;
    const currYear = Math.floor(ageMS/yearMS);
    const currMonth = Math.max(0, Math.round((ageMS%yearMS)/monthMS));
    const result = currYear + ' year(s), ' + currMonth + ' month(s)';
    newBaby.age = result;
    //sets arrivedDate in newBaby
    newBaby.arrivedDate = new Date(newBaby.arrived+'T00:00:00');
    const id = newBaby.parentId;
    if (id) {
      Parents.findById(id)
      .then(parent => {
        newBaby.parent = parent.dataValues;
        res.json(newBaby);
      });
    } else {
      newBaby.parentId = null;
      newBaby.parent = null;
      res.json(newBaby);
    }
  })
  .catch(next);
})

//Update existing cats
router.put('/', (req, res, next) => {
  const {furbaby: id, parent: parentId} = req.body;
  return FurBabies.update({id, parentId},{
    where: { id },
    individualHooks: true
  })
  .then((updatedInfo) => {
    res.json(updatedInfo)})
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