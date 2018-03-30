const router = require('express').Router();
const { Parents } = require('../models');

router.get('/', (req, res, next) => {
  Parents.findAll()
  .then(parents => res.json(parents))
  .catch(next);
})

//Creates new entries for parents
router.post('/', (req, res, next) => {
  Parents.create(req.body)
  .then(newParents => res.json(newParents))
  .catch(next);
})

//Update existing parents
router.put("/:parentId", (req, res, next) => {
  const id = req.params.parentId;
  return Parents.update(req.body,{
    where: { id }
  })
  .then((updatedInfo) => {
    res.status(200).json(updatedInfo).end()})
  .catch(next);
})

//Delete parents
router.delete("/:parentId", (req, res, next) => {
  let id = req.params.parentId;
  Parents.destroy({ where: { id } })
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;