const db = require('./index.js');
const { FurBabies, Parents } = require('../models');

const furbabies = [
  {
    name: "Bevo",
    breed: "Tabby Diva",
    parentId: 1
  },
  {
    name: "Mama",
    breed: "Scaredy Tabby",
    parentId: 5
  },
  {
    name: "Smokey",
    breed: "Grey moro",
    parentId: 2
  },
  {
    name: "Remington",
    breed: "Orange Tabby",
    parentId: 3
  },
  {
    name: "Mr. Wobbles",
    breed: "Wobbly",
    parentId: 3
  },
  {
    name: "Sylvester",
    breed: "Kale",
    parentId: 1
  },
  {
    name: "Pizzazz",
    breed: "Bombay",
    parentId: 2
  }
];

const parents = [
  {
    name: "Kritika Khadka",
    address: "35-20 Leverich St"
  },
  {
    name: "Anuj Pant",
    address: "35-20 Leverich St"
  },
  {
    name: "Theresa Samsingh",
    address: "109-46 122nd st"
  },
  {
    name: "Jean",
    address: "Brooklyn"
  },
  {
    name: "Vani",
    address: "109-46 122nd st"
  },
];

const seed = async () =>
  Promise.all(parents.map(parent => Parents.create(parent)))
    .then(() => Promise.all(furbabies.map(furbaby => FurBabies.create(furbaby))))
    .then(() => console.log("Seeding complete!"));

const main = () => {
  console.log("Syncing db...");
  db.sync({ force: true })
    .then(() => {
      console.log("Seeding database...");
      return seed();
    })
    .catch(err => {
      console.log("Error while seeding");
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();