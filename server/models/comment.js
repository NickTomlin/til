'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('comment', new mongoose.Schema({
  text: {
    type: 'String',
    required: true
  }
}));
