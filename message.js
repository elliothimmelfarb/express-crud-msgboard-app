'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const moment = require('moment');

const dataPath = path.join(__dirname, 'messages.json');

exports.get = cb => {
  readMsgs(cb);
}

exports.create = (author, text, cb) => {
  readMsgs((err, msgs) => {
    let msgObj = {};
    msgObj.author = author;
    msgObj.text = text;
    msgObj.time = moment().format('MMMM Do YYYY, h:mm:ss a');
    msgObj.id = uuid();
    msgs.push(msgObj);
    writeMsgs(msgs, cb);
  });
};

exports.delete = (id, cb) => {
  readMsgs((err, msgs) => {
    for(let i = 0; i < msgs.length; i++) {
      if(msgs[i].id === id) {
        msgs.splice(i, 1);
        break;
      }
    }
    writeMsgs(msgs, cb);
  });
};

exports.edit = (id, text, cb) => {
  readMsgs((err, msgs) => {
    let index, msgObj;
    for(let i = 0; i < msgs.length; i++) {
      if(msgs[i].id === id) {
        index = i;
        msgObj = msgs[i];
        break;
      }
    }
    msgObj.text = text;
    msgObj.edited = moment().format('MMMM Do YYYY, h:mm:ss a');
    msgs[index] = msgObj;
    writeMsgs(msgs, cb);
  });
};

function writeMsgs(msgs, cb) {
  fs.writeFile(dataPath, JSON.stringify(msgs), cb);
}

function readMsgs(cb) {
  fs.readFile(dataPath, (err, data) => {
    if (err) return cb(err);
    try {
      var msgs = JSON.parse(data);
    } catch (e) {
      var msgs = [];
    }
    cb(null, msgs);
  });
}
