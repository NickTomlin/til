'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
  gitHubId: {
    type: String
  },
  displayName: {
    required: true,
    type: String
  }
}));
