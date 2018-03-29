const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
const db = require("./models").db;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("error: " + err);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Starting the db at ${Date.now()} in port ${port}!`);
  db.sync({force: true})
  .then(() => console.log('Database is synched!'))
  .catch((err) => console.error('Trouble in flavor town!', err, err.stack));
});