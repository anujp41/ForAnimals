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
    type: Sequelize.DATE,
    allowNull: false
  },
  intakeDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  currentStatus: {
    type: Sequelize.ENUM('Adoptable', 'Available as Barn Cat', 'Adoption Pending', 'Return Pending', 'Adopted', 'Fostered', 'Deceased', 'Returned to Colony'),
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
    type: Sequelize.ENUM("Male", "Female"),
    allowNull: false
  },
  altered: {
    type: Sequelize.BOOLEAN,
    allowNull: false
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
    type: Sequelize.STRING,
    defaultValue: false,
    allowNull: false
  },
  behavioralIssues: {
    type: Sequelize.STRING,
    allowNull: false
  },
  goodWithCats: {
    type: Sequelize.ENUM("Yes", "No", "Unsure"),
    defaultValue: "Yes",
    allowNull: false
  },
  goodWithDogs: {
    type: Sequelize.ENUM("Yes", "No", "Unsure"),
    defaultValue: "Yes",
    allowNull: false
  },
  goodWithChildren: {
    type: Sequelize.ENUM("Yes", "No", "Unsure"),
    defaultValue: "Yes",
    allowNull: false
  },
  specialNeeds: {
    type: Sequelize.STRING,
    defaultValue: 'N/A',
    allowNull: true
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  addlComments: {
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
    defaultValue: 'N/A',
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
    type: Sequelize.STRING,
    allowNull: true
  },
  imagesOtherURL: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  }
}
// {
//   getterMethods: {
//     age() {
//       const currDate = new Date().getTime();
//       const birthDate = this.birthDate;
//       const ageMS = currDate - birthDate;
//       const yearMS = 3.154e+10;
//       const monthMS = 2.628e+9;
//       const currYear = Math.floor(ageMS/yearMS);
//       const currMonth = Math.max(0, Math.round((ageMS%yearMS)/monthMS));
//       const result = currYear + ' year(s), ' + currMonth + ' month(s)';
//       return result;
//     },
//     arrivedDate() {
//       return new Date(this.arrived+'T00:00:00');
//     }
//   }
// }
, {
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