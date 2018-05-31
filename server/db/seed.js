const db = require('./index.js');
const { FurBabies, Parents } = require('../models');

const furbabySeedData = [{
  shelterName: 'Monica',
  adoptedName: 'Mona',
  birthDate: '5/5/11',
  intakeDate: '9/20/15',
  currentStatus: 'Adopted',
  size: 'Medium',
  coatColor: 'Calico',
  coatLength: 'short',
  breed: 'Domestic Short hair',
  gender: 'Female',
  altered: true,
  fivStatus: false,
  felvStatus: false,
  otherMedical: 'kidney issue',
  behavioralIssues: 'friendly but shy',
  goodWithCats: 'Yes',
  goodWithDogs: 'Yes',
  goodWithChildren: 'Yes',
  bio: 'Mona was brought to the shelter after she was found roaming in the street in Jamaica',
  currentLocation: 'Park Slope',
  courtesyListing: false,
  courtesyListLoc: 'N/A',
  parentId: 1,
  youtubeVid: 'https://www.mona.com',
  photoUrl: 'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
  microchipNum: 'FDX-Axxxxxxxxxx',
  imagesOtherURL: ["https://www.motherearthnews.com/~/media/Images/MEN/Editorial/Blogs/Organic%20Gardening/Top%2010%20Natural%20Foods%20for%20Cat%20Health/quality-food-for-your-pregnant-cat.jpg?h=467&w=550&hash=6EE24A37382242D01D082FBA97209932733E5D0B"] 
}, { 
  shelterName: 'Parksville',
  adoptedName: 'Bevo',
  birthDate: '4/13/15',
  intakeDate: '4/27/15',
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
  imagesOtherURL: [] 
}, {
  shelterName: "Macy",
  birthDate: "03/17/2017",
  intakeDate: "01/20/2018",
  currentStatus: "Adoptable",
  size: "Large",
  coatColor: "Black",
  coatLength: "Small",
  breed: "Short hair",
  gender: "Male",
  altered: false,
  fivStatu: false,
  felvStatus: true,
  otherMedical: "",
  behavioralIssues: "Not very playful",
  goodWithCats: "Yes",
  goodWithDogs: "Unsure",
  goodWithChildren: "Unsure",
  specialNeeds: 'None',
  bio: "He was rescued in Ozone Park",
  currentLocation: "S Ozone Park, NY",
  courtesyListing: false,
  courtesyListLoc: "N/A",
  youtubeVid: "https://www.youtube.com/watch?v=wWqdhBdeMSg",
  photoUrl: "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg",
  microchipNum: '98127y981y9182',
  imagesOtherURL: ["http://pamperedpawgifts.com/images/cat-healthy-blog.jpg", "http://www.animalbehaviorcollege.com/blog/wp-content/uploads/2017/02/CatHealth-vet.jpg"]
  }
]

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
    address: "109-46 122nd st Apt B"
  }
];

const seed = async () =>
  Promise.all(parents.map(parent => Parents.create(parent)))
    .then(() => Promise.all(furbabySeedData.map(furbaby => FurBabies.create(furbaby))))
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
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();