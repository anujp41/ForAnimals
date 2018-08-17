const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const db = require('../db');

const User = db.define('user', {
  fullName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set: function(plainString) {
      return this.setDataValue('password', this.hashPassword(plainString));
    }
  },
  googleId: Sequelize.STRING,
});

User.prototype.hashPassword = function(passwordString) {
  return bcrypt.hashSync(passwordString, bcrypt.genSaltSync());
}

module.exports = User;