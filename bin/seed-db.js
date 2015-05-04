'use strict';

var rsvp = require('rsvp');
var mongoose = require('mongoose');
var config = require('../lib/config');
var models = require('../server/models');
var DB = config.get('db');

var data = {
  til: [
    {
      text: 'you can toggle between #vim splits by using ctrl + w + | and ctrl + w + =',
      userId: '0'
    },
    {
      text: '#angular\'s ng-repeat track-by attribute is a wonderful way to achieve performant DOM updates',
      userId: '0'
    },
    {
      text: '#mongoose has native es6 support built into version 3.9.X',
      userId: '0'
    }
  ],
  comment: [
    {
      text: 'hey this is a great comment'
    },
    {
      text: 'I disagree'
    }
  ]
};

function seedModel (modelName) {
  console.log('Seeding data for  ', modelName);
  return rsvp.all(data[modelName].map(function (modelData) {
    return new rsvp.Promise(function (resolve, reject) {
      models[modelName].create(modelData, function (err, result) {
        if (err) { return reject(err); }
        resolve(result);
      });
    });
  }));
}

function populateComments (tils, comments) {
  comments.forEach(function (comment) {
    tils[0].comments.push(comment);
  });
  return tils[0].save();
}

function connect (cb) {
  if (mongoose.connection.db) { return cb(); }
  mongoose.connect(DB, function () {
    mongoose.connection.db.dropDatabase(function () {
      console.log('Dropped Database. ' + DB + ' Seeding');
      cb();
    });
  });
}

function seed () {
  return new rsvp.Promise(function (resolve) {
    connect(function () {
      seedModel('til')
      .then(function (tils) {
        return seedModel('comment')
        .then(function (comments) {
          return populateComments(tils, comments);
        });
      }).finally(function () { resolve(); });
    });
  })
  .catch(function (err) {
    console.log('Error seeding', err);
  });
}

seed.clean = function () {
  console.log('Disconnecting from', DB);
  return new rsvp.Promise(function (resolve) {
    mongoose.disconnect(resolve);
  });
};

if (require.main === module) {
  return seed()
    .finally(function () {
      return seed.clean();
    });
}

module.exports = seed;
