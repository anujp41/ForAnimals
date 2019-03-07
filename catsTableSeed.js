require('dotenv').config();
const catsTable = require('./catsTable.json');
const Sequelize = require('sequelize');
const db = require('./server/db');
// const db = new Sequelize(process.env.HEROKU_DATABASE_URL, {
//   dialectOptions: {
//     ssl: true
//   },
//   logging: true
// });

/*
const db = new Sequelize('postgres://localhost:5432/forAnimals', {
  logging: false
});
*/

const { FurBabies, Parents } = require('./server/models');

const main = () => {
  console.log('Syncing db...');
  db.sync()
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
