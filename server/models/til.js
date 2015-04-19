'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('til', mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
}));
