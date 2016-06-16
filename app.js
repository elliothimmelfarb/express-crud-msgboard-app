'use strict';

const PORT = 8000

/////////// REQUIRES ///////////
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const message = require('./message');

/////////// APP DECLARATION ///////////
let app = express();

/////////// GENERAL PURPOSE MIDDLEWARE ///////////
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

/////////// ROUTES ///////////
app.get('/', (req, res) => {
  res.send('hello word!');
})

/////////// APP LISTEN ///////////
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})
