require('dotenv').config();

const Sequelize = require('sequelize');

let db = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: true
      },
      logging: false
    })
  : new Sequelize('postgres://localhost:5432/forAnimals', {
      logging: false
    });

module.exports = db;
