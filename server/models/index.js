const db = require('../db');
const FurBabies = require('./furbabies');
const Parents = require('./parents');
const User = require('./users');
const ResetPWLog = require('./resetPWLog');

FurBabies.belongsTo(Parents);
Parents.hasMany(FurBabies);

module.exports = {
  db,
  FurBabies,
  Parents,
  User,
  ResetPWLog
};