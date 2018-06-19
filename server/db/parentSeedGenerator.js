let zipcodes = require('zipcodes');
const Chance = require('chance');
const chance = new Chance();

const defaultJSON = () => {
  let zip = chance.zip();
  let zipInfo = zipcodes.lookup(zip);
  //loops till the random chance zipcode is verfied to be real zip code
  while (zipInfo === undefined) {
    zip = chance.zip();
    zipInfo = zipcodes.lookup(zip);
  }
  const {city, state} = zipInfo;
  return {
    name: chance.name(),
    address: chance.address(),
    city,
    state,
    zip
  }
};

const createParentSeed = function() {
  const seed = new Array();
  for (let i = 0; i < 100; i++) {
    seed.push(defaultJSON());
  }
  return seed;
};

const parentSeed = createParentSeed();

module.exports = parentSeed;