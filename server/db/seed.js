const createFurbabySeed = require('./furbabySeedGenerator');
const createParentSeed = require('./parentSeedGenerator');
const furbabySeed = createFurbabySeed();
const parentSeed = createParentSeed();

const db = require('./index.js');
const { FurBabies, Parents } = require('../models');

const main = () => {
  console.log(`Syncing Parents database with ${parentSeed.length} items ...`);
  return Parents.bulkCreate(parentSeed)
  .then(() => {
    console.log(`Syncing Furbabies database with ${furbabySeed.length} items...`);
    return FurBabies.bulkCreate(furbabySeed)})
  .then(() => {
    console.log('finished seeding')
    db.close();
    return null;
  });
};

main();