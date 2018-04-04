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
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Cute-kittens-12929201-1600-1200.jpg/640px-Cute-kittens-12929201-1600-1200.jpg',
    validate: {
      isUrl: true
    }
  }
}, 
{
  hooks: {
    afterUpdate: function(furbaby, option) {
      const id = furbaby.parentId;
      const hasFoster = id ? true : false;
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