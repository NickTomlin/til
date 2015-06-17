'use strict';

require('../../../../server/models/user');
var monky = require('./base');
var faker = require('faker');

monky.factory('user', {
  authorizations: [],
  username: function () {
    return faker.name.firstName() + faker.name.lastName();
  },
  displayName: faker.internet.userName,
  email: faker.internet.email
});

monky.factory({name: 'user:marty', model: 'user'}, {
  username: 'martymcfly',
  displayName: 'Marty McFly',
  email: 'marty@mcfly.com',
  authorizations: [
    {
      name: 'basic',
      uuid: 'marty@mcfly.com'
    }
  ]
});

monky.factory({name: 'user:docbrown', model: 'user'}, {
  username: 'docbrown',
  displayName: 'Doc Brown',
  email: 'doc@brown.com'
});
