const Sequelize = require('sequelize');
const db = require('../db');

const FurBabies = db.define('furbaby', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthDate: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  sex: {
    type: Sequelize.STRING,
    values: ['M', 'F'],
    allowNull: false
  },
  arrived: {
    type: Sequelize.STRING
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Cute-kittens-12929201-1600-1200.jpg/640px-Cute-kittens-12929201-1600-1200.jpg',
    validate: {
      isUrl: true
    }
  },
  comments: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  spayed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  fivpositive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  fostered: {
    type: Sequelize.BOOLEAN,
    value: [true, false],
    defaultValue: false
  },
  adopted: {
    type: Sequelize.BOOLEAN,
    value: [true, false],
    defaultValue: false
  }
}, {
  getterMethods: {
    age() {
      const currDate = new Date().getTime();
      const birthDate = this.birthDate;
      const ageMS = currDate - birthDate;
      const yearMS = 3.154e+10;
      const monthMS = 2.628e+9;
      const currYear = Math.round(ageMS/yearMS);
      const currMonth = Math.max(0, Math.round((ageMS%yearMS)/monthMS));
      const result = currYear + ' year(s), ' + currMonth + ' month(s)';
      return result;
    },
    arrivedDate() {
      return new Date(this.arrived+'T00:00:00');
    }
  }
}, {
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