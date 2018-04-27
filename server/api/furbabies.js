const router = require('express').Router();
const { FurBabies, Parents } = require('../models');

router.get('/', (req, res, next) => {
  FurBabies.findAll({
    include: [Parents],
    order: ['id']
  })
  .then(newBabies => res.json(newBabies))
  .catch(next);
})

//Creates new entries for kitties
router.post('/', (req, res, next) => {
  FurBabies.create(req.body)
  .then(newBabies => {
    console.log('created baby ', newBabies)
    const id = newBabies.parentId;
    if (id) {
      Parents.findById(id)
      .then(parent => {
        const newBaby = newBabies.dataValues;
        newBaby.parent = parent.dataValues;
        res.json(newBaby);
      });
    } else {
      const newBaby = newBabies.dataValues;
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