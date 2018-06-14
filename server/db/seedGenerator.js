// const Chance = require("chance");
// const chance = new Chance();

// const currentState = ['Adoptable', 'Available as Barn Cat', 'Adoption Pending', 'Return Pending', 'Adopted', 'Fostered', 'Deceased', 'Returned to Colony'];
// const gender = ['Male', 'Female'];
// const goodVars = ['Yes', 'No', 'Unsure'];

// const capitalize = string => string.replace(/\b\w/g, l => l.toUpperCase());

// const defaultJSON = () => ( {shelterName: chance.name(),
//   adoptedName: chance.name(),
//   birthDate: chance.year({min: 2000, max: 2018})+'-'+chance.month({raw: true}).numeric+'-'+chance.integer({ min: 1, max: 28 }),
//   intakeDate: chance.year({min: 2000, max: 2018})+'-'+chance.month({raw: true}).numeric+'-'+chance.integer({ min: 1, max: 28 }),
//   currentStatus: currentState[chance.integer({min:0, max: currentState.length-1})],
//   size: capitalize(chance.word({length: 5})),
//   coatColor: capitalize(chance.word({length: 7})),
//   coatLength: capitalize(chance.word({length: 5})),
//   breed: capitalize(chance.sentence({words: 2})),
//   gender: gender[chance.integer({min:0, max: gender.length-1})],
//   altered: chance.bool({likelihood: 95}),
//   fivStatus: chance.bool({likelihood: 60}),
//   felvStatus: chance.bool({likelihood: 80}),
//   otherMedical: capitalize(chance.sentence({words: 5})),
//   behavioralIssues: capitalize(chance.sentence({words: 7})),
//   goodWithCats: goodVars[chance.integer({min:0, max: goodVars.length-1})],
//   goodWithDogs: goodVars[chance.integer({min:0, max: goodVars.length-1})],
//   goodWithChildren: goodVars[chance.integer({min:0, max: goodVars.length-1})],
//   specialNeeds: capitalize(chance.sentence({words: 15})),
//   bio: capitalize(chance.sentence({words: 25})),
//   currentLocation: chance.address(),
//   courtesyListing: chance.bool(),
//   courtesyListLoc: chance.bool({likelihood: 5}),
//   parentId: 2,
//   youtubeVid: chance.url({domain: 'www.youtube.com'}),
//   photoUrl: chance.url({extensions: ['jpg', 'png']}),
//   microchipNum: 'TVNxxxxxxxxxx',
//   imagesOtherURL: chance.n(chance.url, chance.integer({ min: 0, max: 20 }), {extensions: ['doc', 'docx', 'pdf']})
// });

//   const seed = [];

//   for (let i = 0; i < 5; i++) {
//     seed.push(defaultJSON());
//   }
//   console.log(seed)

var cats = require("cats-js");
 
var c = new cats();
 
c.get({type: "jpg", size: "med"}).then(cat => console.log(cat));