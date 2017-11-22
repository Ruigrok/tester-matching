const express = require('express');
const bodyParser = require('body-parser');
const nodemon = require('nodemon');
const morgan = require('morgan');
const path = require('path');

var app = express();

var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Static directory
app.use(express.static('client/public'));
//app.use(express.static(path.join(__dirname, 'client/build')));

require('./api-routes.js')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});  */

app.listen(PORT, () => {
  console.log('App listening on PORT ' + PORT);
});