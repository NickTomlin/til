'use strict';

var mongoose = require('mongoose');
var config = require('../lib/config');
var models = require('../server/models');

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

function done () {
  mongoose.disconnect(function () {
    console.log('Done seeding database.');
  });
}

function seed (modelName, cb) {
  console.log('Seeding for ', modelName);
  data[modelName].reduce(function (results, modelData, dataIndex, dataKeys) {
    models[modelName].create(modelData, function (err, result) {
      if (err) { throw new Error(err); }
      results.push(result);
      if (dataIndex + 1 === dataKeys.length) {
        cb(results);
      }
    });
    return results;
  }, []);
}

try {
  mongoose.connect(config.get('db'), function () {
    mongoose.connection.db.dropDatabase(function () {
      console.log('Dropped Database. Seeding');
      seed('til', function () {
        seed('comment', done);
      });
    });
  });
} catch (e) {
  console.log('Err', e);
  done();
}
