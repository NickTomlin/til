'use strict';

require('../../../../server/models/til');
var monky = require('./base');
var faker = require('faker');

monky.factory('comment', {
  userId: monky.ref('user', 'id'),
  text: faker.lorem.sentence
});

monky.factory('til', {
  text: faker.lorem.sentence,
  comments: [],
  user: monky.ref('user', 'id')
});
