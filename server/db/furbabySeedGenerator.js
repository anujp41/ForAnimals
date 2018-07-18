const Chance = require('chance');
const moment = require('moment');
const parentSeed = require('./parentSeedGenerator');
const chance = new Chance();
const imageURLArr = require('./photoURLSeed');

const currentStatusArray = ['Adoptable', 'Available as Barn Cat', 'Adoption Pending', 'Return Pending', 'Adopted', 'Fostered', 'Deceased', 'Returned to Colony'];
const adoptionStatusArray = ['Adoptable', 'Available as Barn Cat', 'Deceased', 'Returned to Colony'];
const gender = ['Male', 'Female'];
const goodVars = ['Yes', 'No', 'Unsure'];

const capitalize = string => string.replace(/\b\w/g, l => l.toUpperCase());

const defaultJSON = () => {
  const birthDate = chance.birthday({type: 'child'});
  const birthDateFormatted = moment(birthDate).format('MM-DD-YYYY');
  const addlIntakeDay = chance.integer({min: 30, max: 1825});
  const intakeDate = moment(Math.min(moment(birthDate).add(addlIntakeDay, 'days'), moment())).format('MM-DD-YYYY');
  const addlAdoptionDate = chance.integer({min: addlIntakeDay, max: 1825});
  const adoptionDate = moment(birthDate).add(addlIntakeDay, 'days').add(addlAdoptionDate, 'days').format('MM-DD-YYYY');
  return {
    shelterName: chance.first({ nationality: 'it' }),
    birthDate: birthDateFormatted,
    intakeDate: intakeDate,
    currentStatus: currentStatusArray[chance.integer({min:0, max: currentStatusArray.length-1})],
    size: capitalize(chance.word({length: 5})),
    coatColor: capitalize(chance.word({length: 7})),
    coatLength: capitalize(chance.word({length: 5})),
    breed: capitalize(chance.sentence({words: 2})),
    gender: gender[chance.integer({min:0, max: gender.length-1})],
    altered: chance.bool({likelihood: 95}),
    fivStatus: chance.bool({likelihood: 60}),
    felvStatus: chance.bool({likelihood: 80}),
    otherMedical: capitalize(chance.sentence({words: 5})),
    behavioralIssues: capitalize(chance.sentence({words: 7})),
    goodWithCats: goodVars[chance.integer({min:0, max: goodVars.length-1})],
    goodWithDogs: goodVars[chance.integer({min:0, max: goodVars.length-1})],
    goodWithChildren: goodVars[chance.integer({min:0, max: goodVars.length-1})],
    specialNeeds: capitalize(chance.sentence({words: 15})),
    bio: capitalize(chance.sentence({words: 25})),
    addlComments: capitalize(chance.sentence({words: 25})),
    currentLocation: chance.address(),
    courtesyListing: chance.bool(),
    courtesyListLoc: chance.bool({likelihood: 5}),
    parentId: chance.integer({min: 1, max: 100}),
    adoptionDate: adoptionDate,
    youtubeVid: chance.url({domain: 'www.youtube.com'}),
    photoUrl: imageURLArr[chance.integer({min: 0, max: 199})],
    microchipNum: chance.hash({length: 15}),
    otherFilesURL: chance.n(chance.url, chance.integer({ min: 0, max: 20 }), {extensions: ['doc', 'docx', 'pdf']})
}};

const createFurbabySeed = function() {
  const seed = new Array();
  for (let i = 0; i < 500; i++) {
    const seedObj = defaultJSON();
    const currentStatus = seedObj.currentStatus;
    if (adoptionStatusArray.indexOf(currentStatus) >= 0) seedObj.parentId = null;
    if (seedObj.parentId === null) seedObj.adoptionDate = null;
    seedObj.adoptedName = seedObj.parentId === null ? '' : chance.first({ nationality: 'it' });
    seed.push(seedObj);
  }
  return seed;
};

const furbabySeed = createFurbabySeed();

furbabySeed.forEach(furbaby => {
  const parentId = furbaby.parentId;
  const parent = parentSeed[parentId-1];
  if (furbaby.parentId !== null) {
    parent.hasFoster = true;
  };
});

module.exports = {furbabySeed, parentSeed};