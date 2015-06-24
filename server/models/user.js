'use strict';

var mongoose = require('mongoose');
var uuid = require('uuid').v4;
var _ = require('lodash');
var config = require('../lib/config');
var jwt = require('jwt-simple');
var secret = config.tokenSecret || 'dev-token'; // todo: do not rely on defaults

function filterUserObject (doc, obj) {
  return _.omit(obj, 'accessToken');
}

var userSchema = new mongoose.Schema({
  authorizations: [{name: String, uuid: String}],
  username: {
    required: true,
    unique: true,
    type: String
  },
  displayName: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  accessToken: {
    type: String
  }
});

userSchema.options.toObject = {
  transform: filterUserObject
};

userSchema.options.toJSON = {
  transform: filterUserObject
};

userSchema.pre('save', function (next) {
  // i'm unsure if there is a better way to establish
  // dyanmic defaults
  if (this.isNew) {
    this.assignNewAccessToken();
  }
  next();
});

userSchema.methods.getAccessToken = function () {
  return this.accessToken;
};

userSchema.methods.assignNewAccessToken = function () {
  this.accessToken = jwt.encode({
    username: this.username,
    email: this.email,
    random: uuid()
  }, secret);

  return this;
};

module.exports = mongoose.model('user', userSchema);
