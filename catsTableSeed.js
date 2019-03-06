const catsTable = require('./catsTable.json');

const db = require('./server/db');
const { FurBabies, Parents } = require('./server/models');

const main = () => {
  console.log('Syncing db...');
  db.sync({})
    .then(() => {
      console.log(
        `Syncing Furbabies database with ${catsTable.length} items...`
      );
      return FurBabies.bulkCreate(catsTable);
    })
    .then(() => {
      console.log('Finished seeding...');
      db.close();
      return null;
    });
};

main();
