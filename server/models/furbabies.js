const Sequelize = require('sequelize');
const db = require('../db');
const Parents = require('./parents');

const FurBabies = db.define('furbabies', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = FurBabies;