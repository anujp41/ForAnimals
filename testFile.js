const firstLineArr = [
  'adoptedName',
  'breed',
  'gender',
  'size',
  'coatColor',
  'coatLength',
  'bio',
  'intakeDate',
  'currentLocation',
  'addlComments',
  'goodWithCats',
  'goodWithDogs',
  'goodWithChildren',
  'fivStatus',
  'felvStatus',
  'altered',
  'behavioralIssues',
  'otherMedical',
  'specialNeeds',
  'youtubeVid',
  'microchipNum',
  'courtesyListing',
  'currentStatus'
];

const fileContentArr = [
  'Minnie,,f,,tortie,,"Minnie is very gentle. She’s shy at first, but one she gets comfortable she’ll love laying on your lap. She’s not fond of being picked up, but she will tolerate it most of the time. She would be good one or two people in the home. She’s great with other cats.",12/26/17,,"Adopted by David Isaac Ike Hull on 01/06/2018.  Intake Notes: From Linda Daniel; rescues from hoarding situation in Cypress Hills. Cookie Calli\'s daughter.",,,,,,,,,,,,,Adopted',
  'Alex,,f,,,,,7/20/17,,Intake Notes: Injured,,,,,,,,,,,,,'
];
// const fileContentArr = [
//   'Minnie,,f,,tortie,,"Minnie is very gentle. She’s shy at first, but one she gets comfortable she’ll love laying on your lap. She’s not fond of being picked up, but she will tolerate it most of the time. She would be good one or two people in the home. She’s great with other cats.",12/26/17,,"Adopted by David Isaac Ike Hull on 01/06/2018.  Intake Notes: From Linda Daniel; rescues from hoarding situation in Cypress Hills. Cookie Calli\'s daughter.",,,,,,,,,,,,,Adopted'
// ];

const fileContentJSON = [];

for (let j = 0; j < fileContentArr.length; j++) {
  const contentObj = {};
  const currContent = fileContentArr[j];
  let prevCommaIdx = -1;
  let nextCommaIdx = null;
  for (let i = 0; i < firstLineArr.length; i++) {
    if (currContent[prevCommaIdx + 1] === '"') {
      const endQuoteIdx = currContent.indexOf('"', prevCommaIdx + 2);
      const keyVal = currContent.slice(prevCommaIdx + 2, endQuoteIdx);
      contentObj[firstLineArr[i]] = keyVal;
      prevCommaIdx = endQuoteIdx + 1;
    } else {
      nextCommaIdx = currContent.indexOf(',', prevCommaIdx + 1);
      let keyVal = '';
      if (nextCommaIdx === -1) {
        keyVal = currContent.slice(prevCommaIdx + 1);
      } else {
        keyVal = currContent.slice(prevCommaIdx + 1, nextCommaIdx);
      }
      contentObj[firstLineArr[i]] = keyVal;
      prevCommaIdx = nextCommaIdx;
    }
  }
  fileContentJSON.push(contentObj);
}

console.log(fileContentJSON);
