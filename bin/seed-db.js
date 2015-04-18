'use strict';

var mongoose = require('mongoose');
var config = require('../lib/config');
var models = require('../server/models');

var data = {
  til: [
    {
      text: 'you can toggle between #vim splits by using ctrl + w + | and ctrl + w + ='
    },
    {
      text: '#angular\'s ng-repeat track-by attribute is a wonderful way to achieve performant DOM updates'
    },
    {
      text: '#mongoose has native es6 support built into version 3.9.X'
    }
  ]
};

function seed (cb) {
  Object.keys(data).forEach(function (model, dataIndex, dataKeys) {
    var Model = models[model];
    Model.create(data[model], function (err, data) {
      if (dataIndex + 1 === dataKeys.length) {
        cb(data);
      }
    });
  });
}

mongoose.connect(config.get('db'), function () {
  mongoose.connection.db.dropDatabase(function () {
    console.log('Dropped Database. Seeding');
    seed(function () {
      mongoose.disconnect(function () {
        console.log('Done seeding database.');
      });
    })
  });
});
