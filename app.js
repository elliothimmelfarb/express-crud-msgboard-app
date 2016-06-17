'use strict';

const PORT = process.env.PORT || 8000;

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
  res.send('Express CRUD API Message Board!');
})

app.get('/msgboard', (req, res) => {
  message.get((err, msgs) => {
    res.status(err ? 400 : 200).send(err || msgs);
  });
});

app.get('/msgboard/:id', (req, res) => {
  message.getOne(req.params.id, (err, msg) => {
    res.status(err ? 400 : 200).send(err || msg);
  });
});

app.post('/msgboard', (req, res) => {
  message.create(req.body.author, req.body.text, err => {
    if(err) res.status(400).send(err);
    message.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });

});

app.delete('/msgboard/:id', (req, res) => {
  message.delete(req.params.id, (err, msgs) => {
    if(err) res.status(400).send(err);
    message.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});

app.put('/msgboard/:id', (req, res) => {
  message.edit(req.params.id, req.body.text, err => {
    if(err) res.status(400).send(err);
    message.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});

app.post('/msgs', (req, rest) => {});
app.delete('/msgs', (req, rest) => {});
app.put('/msgs', (req, rest) => {});



/////////// APP LISTEN ///////////
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})
