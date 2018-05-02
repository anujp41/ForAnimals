//generateJSON function needs to be atomized further
const fs = require('fs');
const path = require('path');

// const file = path.join(__dirname, '/For_Animals/Cats-Table.csv');

const folder = path.join(__dirname, '/For_Animals');
const filesList = fs.readdirSync(folder);
const filesListCSV = filesList.filter(file => file.slice(-3)==='csv');

function generateJSON(fileName) {
  //point to the path of file and store contents in fileContents
  const file = path.join(folder, fileName);
  const fileContents = fs.readFileSync(file, 'utf8');
  
  //checks where the first line (i.e. column headers) ends
  const lineBreak = fileContents.indexOf('\r\n');
  
  //generate array of headers
  const firstLine = fileContents.slice(0, lineBreak);
  const firstLineArr = firstLine.split(',');
  const firstLineArrUpdate = firstLineArr.map(item => item.toLowerCase().replace(/ /g, '_'));

  //generate array of contents (i.e., everything but the 1st line of fileContents)
  const contents = fileContents.slice(lineBreak);
  const contentArr = contents.split('\r\n');

  //this goes through the contents of the file and generate key-value pair for each line to contents
  const fileContentJSON = contentArr.filter(content => content.length).map(content => {
    if (content.length) {
      const contentObj = {};
      const contentArr = content.split(',');
      for (let i = 0; i < contentArr.length; i++) {
        const key = firstLineArrUpdate[i];
        contentObj[key] = contentArr[i];
      }
      return contentObj;
    } else {
      return {};
    }
  });

  //writes the key-value pair into a JSON file in the For_Animals_JSON folder
  //these json files will be used as seed files for the database
  const data = JSON.stringify(fileContentJSON);
  const targetFolder = `./For_Animals_JSON/${fileName.slice(0, -4)}.json`
  fs.writeFileSync(targetFolder, data);
  console.log('finished writing ', targetFolder);
}

filesListCSV.map(file => generateJSON(file));