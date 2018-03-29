const db = require('../db');
const FurBabies = require('./furbabies');
const Parents = require('./parents');

FurBabies.belongsTo(Parents);
Parents.hasMany(FurBabies);

module.exports = {
  db,
  FurBabies,
  Parents
};