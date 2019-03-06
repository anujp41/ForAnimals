const FurBabies = db.define('furbaby', {
shelterName: {
type: Sequelize.STRING,
allowNull: false
},
**adoptedName: {
type: Sequelize.STRING,
allowNull: true
},
birthDate: {
type: Sequelize.DATE,
allowNull: false
},
**intakeDate: {
type: Sequelize.DATE,
allowNull: false
},
currentStatus: {
type: Sequelize.ENUM('Adoptable', 'Available as Barn Cat', 'Adoption Pending', 'Return Pending', 'Adopted', 'Fostered', 'Deceased', 'Returned to Colony'),
allowNull: false
},
**size: {
type: Sequelize.STRING,
allowNull: false
},
**coatColor: {
type: Sequelize.STRING,
allowNull: false
},
**coatLength: {
type: Sequelize.STRING,
allowNull: false
},
**breed: {
type: Sequelize.STRING,
allowNull: false
},
**gender: {
type: Sequelize.ENUM("Male", "Female"),
allowNull: false
},
**altered: {
type: Sequelize.BOOLEAN,
allowNull: false
},
**fivStatus: {
type: Sequelize.BOOLEAN,
defaultValue: false,
allowNull: false
},
**felvStatus: {
type: Sequelize.BOOLEAN,
defaultValue: false,
allowNull: false
},
**otherMedical**: {
type: Sequelize.STRING,
defaultValue: false,
allowNull: false
},
**behavioralIssues: {
type: Sequelize.STRING,
allowNull: false
},
**goodWithCats: {
type: Sequelize.ENUM("Yes", "No", "Unsure"),
defaultValue: "Yes",
allowNull: false
},
\*\*goodWithDogs: {
type: Sequelize.ENUM("Yes", "No", "Unsure"),
defaultValue: "Yes",
allowNull: false
},
\*\*goodWithChildren: {
type: Sequelize.ENUM("Yes", "No", "Unsure"),
defaultValue: "Yes",
allowNull: false
},
**specialNeeds**: {
type: Sequelize.STRING,
defaultValue: 'N/A',
allowNull: true
},
\*\*bio: {
type: Sequelize.STRING,
allowNull: true
},
\*\*addlComments: {
type: Sequelize.STRING,
allowNull: true
},
\*\*currentLocation: {
type: Sequelize.STRING,
allowNull: true
},
**courtesyListing**: {
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
adoptionDate: {
type: Sequelize.DATE,
allowNull: true
},
**youtubeVid**: {
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
**microchipNum**: {
type: Sequelize.STRING,
allowNull: true
},
otherFilesURL: {
type: Sequelize.ARRAY(Sequelize.JSON),
allowNull: true
}
});
