'use strict';

var mongoose = require('mongoose');

// !! hand waving !!
// this is entirely for demonstration purposes
function nameValidator (name) {
  return !/^fail$/.test(name);
}

module.exports = mongoose.model('til', mongoose.Schema({
  text: {
    type: String,
    required: true,
    validate: [nameValidator, 'Purposefully rejecting because of value {VALUE}.']
  },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String
  }
}));
