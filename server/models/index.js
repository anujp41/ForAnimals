const db = require('../db');
const FurBabies = require('./furbabies');
const Parents = require('./parents');
const User = require('./users');

FurBabies.belongsTo(Parents);
Parents.hasMany(FurBabies);

module.exports = {
  db,
  FurBabies,
  Parents,
  User
};