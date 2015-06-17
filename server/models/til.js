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

// we register here for our factories only. We won't have fully hydrated comment
// models out in the wild
// not sure how I feel about this ¯\_(ツ)_/¯
mongoose.model('comment', comment);

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
