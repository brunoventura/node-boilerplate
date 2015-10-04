'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  name: String,
  password: {type: String, set: cryptPass},
  admin: Boolean
}));

function cryptPass(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = User;
