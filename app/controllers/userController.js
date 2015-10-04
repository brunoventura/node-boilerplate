'use strict';


var userService = require('../services/userService');
var helper = require('../modules/helper');

var userController = {
  getUser: getUser,
  listUsers: listUsers
};

module.exports = userController;

function getUser(req, res) {
  helper.defaultResolver(userService.find(req.params.id), res);
}

function listUsers(req, res) {
  helper.defaultResolver(userService.list(), res);
}
