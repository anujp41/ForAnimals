//generateJSON function needs to be atomized further
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '/catsTable.csv');

const checkKeyVal = (key, val) => {
  val = val.trim();
  switch (key) {
    case 'gender':
      val =
        val.length === 0
          ? 'Undetermined'
          : val[0].toLowerCase() === 'f'
          ? 'Female'
          : 'Male';
      break;
    case 'fivStatus':
    case 'felvStatus':
    case 'altered':
    case 'courtesyListing':
      val = val === 'y' ? true : false;
      break;
    case 'goodWithCats':
    case 'goodWithDogs':
    case 'goodWithChildren':
      val = val === '' ? true : false;
      if (val === 'y') val = 'Yes';
      else if (val === 'n') val = 'No';
      else val = 'Unsure';
      break;
    case 'currentStatus':
      val = val === '' ? 'Undetermined' : val;
      break;
    case 'adoptionDate':
    case 'birthDate':
    case 'intakeDate':
      val = val === '' ? '01/01/1970' : val;
      break;
    default:
      break;
  }
  return val;
};

function generateJSON(fileName) {
  //point to the path of file and store contents in fileContents
  // const file = path.join(folder, fileName);
  const fileContents = fs.readFileSync(fileName, 'utf8');

  //checks where the first line (i.e. column headers) ends
  const lineBreak = fileContents.indexOf('\r\n');

  //generate array of headers
  const firstLine = fileContents.slice(0, lineBreak);
  const firstLineArr = firstLine.split(',');

  //generate array of contents (i.e., everything but the 1st line of fileContents)
  const contents = fileContents.slice(lineBreak);
  const contentsArr = contents.split('\r\n');

  //this goes through the contents of the file and generate key-value pair for each line to contents
  const fileContentArr = contentsArr.filter(
    content => content.length && content[0] !== ','
  );

  //stores all the objects to be entered in database
  const fileContentJSON = [];

  for (let j = 0; j < fileContentArr.length; j++) {
    const contentObj = {};
    const currContent = fileContentArr[j];
    let prevCommaIdx = -1;
    let nextCommaIdx = null;
    for (let i = 0; i < firstLineArr.length; i++) {
      if (currContent[prevCommaIdx + 1] === '"') {
        const endQuoteIdx = currContent.indexOf('"', prevCommaIdx + 2);
        let keyVal = currContent.slice(prevCommaIdx + 2, endQuoteIdx);
        keyVal = checkKeyVal(firstLineArr[i], keyVal.trim());
        // if (keyVal !== '') {
        contentObj[firstLineArr[i]] = keyVal;
        // }
        prevCommaIdx = endQuoteIdx + 1;
      } else {
        nextCommaIdx = currContent.indexOf(',', prevCommaIdx + 1);
        let keyVal = '';
        if (nextCommaIdx === -1) {
          keyVal = currContent.slice(prevCommaIdx + 1);
        } else {
          keyVal = currContent.slice(prevCommaIdx + 1, nextCommaIdx);
        }
        keyVal = checkKeyVal(firstLineArr[i], keyVal.trim());
        // if (keyVal !== '') {
        contentObj[firstLineArr[i]] = keyVal;
        // }
        prevCommaIdx = nextCommaIdx;
      }
    }
    contentObj.birthDate = '01/01/1970'; //as birthday is missing from all cats; adding a default date for seed cats
    fileContentJSON.push(contentObj);
  }

  //writes the key-value pair into a JSON file in the For_Animals_JSON folder
  //these json files will be used as seed files for the database
  const data = JSON.stringify(fileContentJSON);
  const targetFolder = './catsTable.json';
  fs.writeFileSync(targetFolder, data);
  console.log('finished writing');
}

generateJSON(dataFile);
