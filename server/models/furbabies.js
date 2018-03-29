const Sequelize = require('sequelize');
const db = require('../db');
// const Parents = require('./parents');

const FurBabies = db.define('furbaby', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, 
{
  hooks: {
    afterCreate: function(furbaby, option) {
      const parentId = furbaby.parentId;
      this.associations.parent.target.update({hasFoster: true}, {where: {id: parentId}})
    }
  }
});

module.exports = FurBabies;