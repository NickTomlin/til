'use strict';

var mongoose = require('mongoose');

// !! hand waving !!
// this is entirely for demonstration purposes
function nameValidator (name) {
  return !/^fail$/.test(name);
}

var comment = new mongoose.Schema({
  text: {
    type: 'String',
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('til', mongoose.Schema({
  text: {
    type: String,
    required: true,
    validate: [nameValidator, 'Purposefully rejecting because of value {VALUE}.']
  },
  timestamp: {type: Date, default: Date.now},
  comments: [comment],
  user: {
    type: String,
    required: true,
    ref: 'user'
  }
}));
