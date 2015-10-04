'use strict';

var bcrypt = require('bcrypt');
var User = require('../models/User');
var errorHandler = require('../modules/errorHandler');

var userService = {
  save: save,
  find: find,
  list: list,
  auth: auth,
  clean: clean
};

module.exports = userService;

function save(user) {
  var promise = new Promise(function(resolve, reject){
    user.save(function(err) {
      if (err) reject(errorHandler(User.modelName).serverError());
      resolve();
    });
  });
  return promise;
};

function find(value, field) {
  var promise = new Promise(function(resolve, reject){
    var query = {};
    query[field || '_id'] = value;

    User.findOne(query, function(err, user) {
      if (err) reject(errorHandler(User.modelName).serverError());
      if (!user) reject(errorHandler(User.modelName).notFound());
      resolve(user);
    });
  });
  return promise;
};

function list(id, cb) {
  var promise = new Promise(function(resolve, reject){
    User.find({}, function(err, users) {
      if (err) reject(errorHandler(User.modelName).serverError());
      resolve(users);
    });
  });
  return promise;
};

function auth(name, password) {
  var promise = new Promise(function(resolve, reject){
    find(name, 'name')
      .then(function(user) {
        var authResult = bcrypt.compareSync(password, user.password);
        if (!authResult) reject(errorHandler(User.modelName).authenticationError());
        resolve(user);
      })
      .catch(function(err) {
        reject(err);
      });
  });
  return promise;
}

function clean() {
  //TODO
};
