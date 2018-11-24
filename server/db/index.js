const Sequelize = require('sequelize');
console.log('here ', process.env.DATABASE_URL);

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/forAnimals',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432,
    host: 'ec2-50-16-196-57.compute-1.amazonaws.com',
    logging: false
  }
);

module.exports = db;
