const Sequelize = require('sequelize');
const db = require('../db');

const FurBabies = db.define('furbaby', {
  shelterName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  adoptedName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  birthDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  intakeDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  currentStatus: {
    type: Sequelize.STRING,
    values: ['Adoptable', 'Available as Barn Cat', 'Adoption Pending', 'Return Pending', 'Adopted', 'Deceased', 'Returned to Colony'],
    allowNull: false
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  coatColor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  coatLength: {
    type: Sequelize.STRING,
    allowNull: false
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    values: ['M', 'F'],
    allowNull: false
  },
  altered: {
    type: Sequelize.STRING,
    allowNull: false,
    values: ['']
  },
  fivStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  felvStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  otherMedical: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  behavioralIssues: {
    type: Sequelize.STRING,
    allowNull: false
  },
  goodWithCats: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  goodWithDogs: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  goodWithChildren: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  specialNeeds: {
    type: Sequelize.STRING,
    allowNull: true
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  currentLocation: {
    type: Sequelize.STRING,
    allowNull: true
  },
  courtesyListing: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  courtesyListLoc: {
    type: Sequelize.STRING,
    allowNull: true
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  youtubeVid: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Cute-kittens-12929201-1600-1200.jpg/640px-Cute-kittens-12929201-1600-1200.jpg',
    validate: {
      isUrl: true
    }
  },
  microchipNum: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  imagesOtherURL: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
}, {
  getterMethods: {
    age() {
      const currDate = new Date().getTime();
      const birthDate = this.birthDate;
      const ageMS = currDate - birthDate;
      const yearMS = 3.154e+10;
      const monthMS = 2.628e+9;
      const currYear = Math.floor(ageMS/yearMS);
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