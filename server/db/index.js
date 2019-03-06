require('dotenv').config();

const Sequelize = require('sequelize');

//db credentials for local db
/*
const db = new Sequelize('postgres://localhost:5432/forAnimals', {
  logging: false
});
*/

//db credentials for heroku db
// const db = new Sequelize(
//   process.env.DATABASE,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres'
//   }
// );
const db = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: true
  },
  logging: false
});

module.exports = db;
