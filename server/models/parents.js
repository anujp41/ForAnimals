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
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.scum-mag.com/wp-content/uploads/2017/12/1dd3ce16258b37f203811e5450725248-diego-velazquez-classic-paintings.jpg',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Parents;