#!/usr/bin/env node
'use strict';

var rsvp = require('rsvp');
var mongoose = require('mongoose');
var config = require('../server/lib/config');
var models = require('../server/models');
var DB = config.get('db');

var data = {
  user: [
    {displayName: 'Marty McFly'},
    {displayName: 'Doc Brown'}
  ],
  til: [
    {
      userId: 'user-id',
      text: 'you can toggle between #vim splits by using ctrl + w + | and ctrl + w + ='
    },
    {
      userId: 'user-id',
      text: '#angular\'s ng-repeat track-by attribute is a wonderful way to achieve performant DOM updates'
    },
    {
      userId: 'user-id-two',
      text: '#mongoose has native es6 support built into version 3.9.X',
      comments: [
        {
          text: 'hey this is a great comment'
        },
        {
          text: 'I disagree'
        }
      ]
    }
  ]
};

function connect () {
  return new rsvp.Promise(function (resolve) {
    if (mongoose.connection.db) {
      console.log('Seed: Database already connected');
      return resolve();
    }

    mongoose.connect(DB);

    mongoose.connection.on('open', function () {
      console.log('connect');
      resolve();
    });

    mongoose.connection.on('error', function (err) {
      console.log('mongo error', err);
      console.log(err.stack);
    });
  });
}

function close () {
  if (mongoose.connection.db) {
    mongoose.connection.close();
  }
}

function populateModel (modelName) {
  // we should totally just remove the model here
  // but mongoose does not seem to like us doing that
  var model = models[modelName];
  return rsvp.all(data[modelName].map(function (modelData) {
    return new model(modelData).save();
  }));
}

function populate () {
  return connect()
  .then(function () {
    return models.user.remove({})
    .then(function () {
      return models.til.remove({});
    })
    .then(function () {
      return populateModel('user')
        .then(function () {
          return populateModel('til');
        });
    });
  })
  .catch(function (err) {
    console.log('seed err', err);
    console.log(err.stack);
  });
}

if (require.main === module) {
  populate()
    .then(function () {
      console.log('Succesfully Populated database');
    })
    .finally(close);
}

module.exports = {
  populate: populate,
  close: close
};
