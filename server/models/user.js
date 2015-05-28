'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
  authorizations: [{name: String, uuid: String}],
  displayName: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  }
}));
