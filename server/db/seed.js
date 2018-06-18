const {furbabySeed, parentSeed} = require('./furbabySeedGenerator');

const db = require('./index.js');
const { FurBabies, Parents } = require('../models');

const main = () => {
  console.log('Syncing db...');
  db.sync({force: true})
  .then(() => {
    console.log(`Syncing Parents database with ${parentSeed.length} items ...`);
    return Parents.bulkCreate(parentSeed)})
  .then(() => {
    console.log(`Syncing Furbabies database with ${furbabySeed.length} items...`);
    return FurBabies.bulkCreate(furbabySeed)})
  .then(() => {
    console.log('Finished seeding...');
    db.close();
    return null;
  });
};

main();