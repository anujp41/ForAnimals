const Chance = require("chance");
const chance = new Chance();

const defaultJSON = () => { 
  return {
    name: chance.name(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip()
  }
};

const createParentSeed = function() {
  const seed = new Array();
  for (let i = 0; i < 100; i++) {
    seed.push(defaultJSON());
  }
  return seed;
};

module.exports = createParentSeed;