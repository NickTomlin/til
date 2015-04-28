'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
  displayName: {
    required: true,
    type: String
  }
}));
