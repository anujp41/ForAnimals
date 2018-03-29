const Sequelize = require('sequelize');
const db = require('../db');

const Parents = db.define('parent', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  hasFoster: {
    type: Sequelize.BOOLEAN,
    value: [true, false],
    defaultValue: false
  }
})

module.exports = Parents;