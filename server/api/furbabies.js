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
  .then(newBabies => res.json(newBabies))
  .catch(next);
})

//Update existing cats
router.put("/:catId", (req, res, next) => {
  const id = req.params.catId;
  return FurBabies.update(req.body,{
    where: { id },
    individualHooks: true
  })
  .then((updatedInfo) => {
    res.status(200).json(updatedInfo).end()})
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