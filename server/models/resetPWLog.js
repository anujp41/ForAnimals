const Sequelize = require('sequelize');
const db = require('../db');

const ResetPWLog = db.define('resetPWLog', {
  resetToken: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  messageID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expiresOn: {
    type: Sequelize.DATE,
    allowNull: false
  },
  tokenUsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  tokenUsedOn: {
    type: Sequelize.DATE,
    allowNull: true
  }
})

module.exports = ResetPWLog;