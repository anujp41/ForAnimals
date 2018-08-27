const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const db = require('../db');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photoURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://firebasestorage.googleapis.com/v0/b/foranimalsinc-2b9a6.appspot.com/o/user%2Fdefault.jpg?alt=media&token=bbecd9fc-3853-47d3-856c-47e6f162c3ba'
  },
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