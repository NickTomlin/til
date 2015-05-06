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
  }
});

module.exports = mongoose.model('til', mongoose.Schema({
  text: {
    type: String,
    required: true,
    validate: [nameValidator, 'Purposefully rejecting because of value {VALUE}.']
  },
  comments: [comment],
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String
  }
}));
