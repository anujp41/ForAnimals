const Sequelize = require('sequelize');
const db = require('../db');

const FurBabies = db.define(
  'furbaby',
  {
    shelterName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    adoptedName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    intakeDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    currentStatus: {
      type: Sequelize.ENUM(
        'Adoptable',
        'Available as Barn Cat',
        'Adoption Pending',
        'Return Pending',
        'Adopted',
        'Fostered',
        'Deceased',
        'Returned to Colony',
        'Undetermined'
      ),
      allowNull: false
    },
    size: {
      type: Sequelize.STRING,
      allowNull: true
    },
    coatColor: {
      type: Sequelize.STRING,
      allowNull: true
    },
    coatLength: {
      type: Sequelize.STRING,
      allowNull: true
    },
    breed: {
      type: Sequelize.STRING,
      allowNull: true
    },
    gender: {
      type: Sequelize.ENUM('Male', 'Female', 'Undetermined'),
      allowNull: false
    },
    altered: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    fivStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    felvStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
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
      type: Sequelize.ENUM('Yes', 'No', 'Unsure'),
      defaultValue: 'Yes',
      allowNull: false
    },
    goodWithDogs: {
      type: Sequelize.ENUM('Yes', 'No', 'Unsure'),
      defaultValue: 'Yes',
      allowNull: false
    },
    goodWithChildren: {
      type: Sequelize.ENUM('Yes', 'No', 'Unsure'),
      defaultValue: 'Yes',
      allowNull: false
    },
    specialNeeds: {
      type: Sequelize.STRING,
      defaultValue: 'N/A',
      allowNull: true
    },
    bio: {
      type: Sequelize.STRING(1234),
      allowNull: true
    },
    addlComments: {
      type: Sequelize.STRING(1234),
      allowNull: true
    },
    currentLocation: {
      type: Sequelize.STRING,
      allowNull: true
    },
    courtesyListing: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    adoptionDate: {
      type: Sequelize.DATE,
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
      type: Sequelize.JSON,
      allowNull: true
    },
    microchipNum: {
      type: Sequelize.STRING,
      allowNull: true
    },
    otherFilesURL: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true
    }
  },
  {
    getterMethods: {
      intakeDateStr() {
        const intakeDate = this.intakeDate.toISOString();
        return intakeDate.slice(0, intakeDate.indexOf('T'));
      },
      adoptionDateStr() {
        if (!this.adoptionDate) return; // if adoptionDate not included in GET request then adoptionDateStr is not included in store data
        const adoptionDate = this.adoptionDate.toISOString();
        return adoptionDate.slice(0, adoptionDate.indexOf('T'));
      },
      ageYYMM() {
        const birthdate = this.birthDate;
        const today = new Date();
        const [todayYear, todayMonth] = [today.getFullYear(), today.getMonth()];
        const [dateYear, dateMonth] = [
          birthdate.getFullYear(),
          birthdate.getMonth()
        ];
        let [ageYear, ageMonth] = [
          todayYear - dateYear,
          todayMonth - dateMonth
        ];
        if (ageMonth < 0) {
          ageMonth = 12 + ageMonth;
          ageYear--;
        }
        return { ageYear, ageMonth };
      }
    },
    setterMethods: {
      setIntakeDate(value) {
        console.log('value:  ', value);
      }
    },
    hooks: {
      afterValidate: function(furbaby) {
        const id = furbaby.parentId;
        const hasFoster = id ? true : false;
        this.associations.parent.target.update(
          { hasFoster },
          { where: { id } }
        );
      }
    }
  }
);

module.exports = FurBabies;
