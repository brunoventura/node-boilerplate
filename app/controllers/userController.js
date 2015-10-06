'use strict';


var userService = require('../services/userService');
var helper = require('../modules/helper');

var userController = {
  get: get,
  list: list,
  create: create,
  update: update,
  remove: remove
};

module.exports = userController;

function create(req, res) {
  helper.defaultResolver(userService.save(req.body.user), res);
}

function get(req, res) {
  helper.defaultResolver(userService.find(req.params.id), res);
}

function list(req, res) {
  helper.defaultResolver(userService.list(), res);
}

function update(req, res) {
  helper.defaultResolver(userService.save(req.body.user), res);
}

function remove(req, res) {
  helper.defaultResolver(userService.delete(req.params.id), res);
}
