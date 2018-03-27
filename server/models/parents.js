const Sequelize = require('sequelize');
const db = require('../db');

const Parents = db.define('parents', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Parents;