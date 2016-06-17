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

app.get('/msgboard', (req, res) => {
  message.get((err, msgs) => {
    if(err) return res.status(400).send(err);
    res.send(msgs);
  });
});

app.get('/msgboard')

app.post('/msgboard', (req, res) => {
  message.create(req.body.author, req.body.text, (err) => {
    if(err) return res.status(400).send(err);
    res.send('Posted!');
  });
});

app.delete('/msgboard/:id', (req, res) => {
  message.delete(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send('Deleted!');
  });
});

app.put('/msgboard', (req, res) => {
  message.edit(req.body.id, req.body.text, err => {
    if(err) return res.status(400).send(err);
    res.send('Edited!');
  });
});



app.post('/msgs', (req, rest) => {});
app.delete('/msgs', (req, rest) => {});
app.put('/msgs', (req, rest) => {});



/////////// APP LISTEN ///////////
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})
