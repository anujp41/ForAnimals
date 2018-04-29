const db = require('./index.js');
const { FurBabies, Parents } = require('../models');

const furbabies = [
  {
    name: "Bevo",
    breed: "Tabby Diva",
    birthDate: new Date(2015, 03, 29).getTime(),
    arrived: "2015-09-15",
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
    birthDate: new Date(2012, 03, 29).getTime(),
    arrived: "2016-02-15",
    sex: "F",
    comments: "Kind-looking, good health",
    spayed: true,
    fivpositive: false,
  },
  {
    name: "Smokey",
    breed: "Grey moro",
    birthDate: new Date(2016, 03, 29).getTime(),
    arrived: "2017-10-21",
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
    birthDate: new Date(2014, 10, 29).getTime(),
    arrived: "2018-01-08",
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
    birthDate: new Date(2012, 10, 29).getTime(),
    arrived: "2012-03-15",
    sex: "M",
    comments: "walks a little bit wobbly",
    spayed: true,
    fivpositive: true,
  },
  {
    name: "Sylvester",
    breed: "Kale",
    birthDate: new Date(2017, 06, 29).getTime(),
    arrived: "2017-11-21",
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
    birthDate: new Date(2012, 01, 29).getTime(),
    arrived: "2016-04-18",
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