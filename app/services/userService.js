'use strict';

var bcrypt = require('bcrypt');
var User = require('../models/User');
var errorHandler = require('../modules/errorHandler');

var userService = {
  save: save,
  remove: remove,
  find: find,
  list: list,
  auth: auth,
  clean: clean
};

module.exports = userService;

function save(user) {
  var promise = new Promise(function(resolve, reject){
    if(!user._id) {
      var modelUser = new User({user});
    }
    modelUser.save(callback);
    function callback(err) {
      if (err) reject(errorHandler(User.modelName).serverError());
      resolve();
    }
  });

  return promise;
}

function remove(id) {
  var promise = new Promise(function(resolve, reject) {
    User.findByIdAndRemove(id, callback);

    function callback(err, user) {
      if (err) reject(errorHandler(User.modelName).serverError());
      if (!user) reject(errorHandler(User.modelName).notFound());
      resolve(user);
    }
  });

  return promise;
}

function find(value, field) {
  var promise = new Promise(function(resolve, reject){
    var query = {};
    query[field || '_id'] = value;

    User.findOne(query, callback);

    function callback(err, user) {
      if (err) reject(errorHandler(User.modelName).serverError());
      if (!user) reject(errorHandler(User.modelName).notFound());
      resolve(user);
    }
  });

  return promise;
}

function list(id, cb) {
  var promise = new Promise(function(resolve, reject){
    User.find({}, callback);
    function callback(err, users) {
      if (err) reject(errorHandler(User.modelName).serverError());
      resolve(users);
    }
  });

  return promise;
}

function auth(name, password) {
  var promise = new Promise(function(resolve, reject){
    find(name, 'name')
      .then(success)
      .catch(error);

    function success(user) {
      var authResult = bcrypt.compareSync(password, user.password);
      if (!authResult) reject(errorHandler(User.modelName).authenticationError());
      resolve(user);
    }

    function error(err) {
      reject(err);
    }
  });
  
  return promise;
}

function clean() {
  //TODO
}
