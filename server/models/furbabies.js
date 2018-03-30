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
    afterUpdate: function(furbaby, option) {
      const id = furbaby.parentId;
      const hasFoster = id ? true : false;
      console.log('will now be updating ', id, hasFoster)
      console.log('model is ', furbaby)
      this.associations.parent.target.update({hasFoster}, {where: {id}})
    },
    afterCreate: function(furbaby, option) {
      const id = furbaby.parentId;
      const hasFoster = id ? true : false;
      this.associations.parent.target.update({hasFoster}, {where: {id}})
    }
  }
});


module.exports = FurBabies;