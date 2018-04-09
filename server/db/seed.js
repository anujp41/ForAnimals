const db = require('./index.js');
const { FurBabies, Parents } = require('../models');

const furbabies = [
  {
    name: "Bevo",
    breed: "Tabby Diva",
    age: 3,
    sex: "F",
    comments: "Super sassy",
    spayed: true,
    fivpositive: false,
    parentId: 1,
    fostered: true,
    adopted: false
  },
  {
    name: "Mama",
    breed: "Scaredy Tabby",
    age: 6,
    sex: "F",
    comments: "Kind-looking, good health",
    spayed: true,
    fivpositive: false,
  },
  {
    name: "Smokey",
    breed: "Grey moro",
    age: 2,
    sex: "M",
    comments: "Always scared of everything",
    spayed: true,
    fivpositive: false,
    parentId: 2,
    fostered: false,
    adopted: true
  },
  {
    name: "Remington",
    breed: "Orange Tabby",
    age: 4,
    sex: "M",
    comments: "",
    spayed: false,
    fivpositive: true,
    parentId: 3,
    fostered: true,
    adopted: false
  },
  {
    name: "Mr. Wobbles",
    breed: "Wobbly",
    sex: "M",
    comments: "walks a little bit wobbly",
    spayed: true,
    fivpositive: true,
    age: 8
  },
  {
    name: "Sylvester",
    breed: "Kale",
    age: 0.7,
    sex: "M",
    comments: "Always hungry and sleepy and chaluwa",
    spayed: true,
    fivpositive: false,
    parentId: 1,
    fostered: false,
    adopted: true
  },
  {
    name: "Pizzazz",
    breed: "Bombay",
    age: 6,
    sex: "F",
    comments: ""
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