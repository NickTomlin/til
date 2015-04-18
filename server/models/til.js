'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Til', mongoose.Schema({
  text: String
}));
