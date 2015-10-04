'use strict';

var User = require('../models/User');
var userService = require('../services/userService');

var populateController = function(req, res) {
  var test = new User({
    name: 'Bruno2',
    password: 'test'
  });

  userService.save(test);
};

module.exports = populateController;
