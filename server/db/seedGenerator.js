const Chance = require("chance");
const chance = new Chance();

const currentState = ['Adoptable', 'Available as Barn Cat', 'Adoption Pending', 'Return Pending', 'Adopted', 'Fostered', 'Deceased', 'Returned to Colony'];
const gender = ['Male', 'Female'];
const goodVars = ['Yes', 'No', 'Unsure'];
const 

const defaultJSON = {shelterName: 'Parksville',
  adoptedName: 'Bevo',
  birthDate: '2015-4-3',
  intakeDate: '2015-4-27',
  currentStatus: 'Adopted',
  size: 'Small',
  coatColor: 'Calico',
  coatLength: 'medium',
  breed: 'Domestic Short hair',
  gender: 'Female',
  altered: true,
  fivStatus: false,
  felvStatus: false,
  otherMedical: 'diva problem',
  behavioralIssues: 'very playful and sweet',
  goodWithCats: 'Yes',
  goodWithDogs: 'Unsure',
  goodWithChildren: 'Yes',
  specialNeeds: 'Needs to be treated like a diva',
  bio: 'Bevo was rescued in Parksville',
  currentLocation: 'Jackson Heights',
  courtesyListing: false,
  courtesyListLoc: 'N/A',
  parentId: 2,
  youtubeVid: 'https://www.bevodiva.com',
  photoUrl: 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg',
  microchipNum: 'TVNxxxxxxxxxx',
  imagesOtherURL: }