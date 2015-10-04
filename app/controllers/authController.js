'use strict';

var jwt = require('jsonwebtoken');
var userService = require('../services/userService');
var errorHandler = require('../modules/errorHandler');
var helper = require('../modules/helper');
var config = require('../config');

var authController = {
  auth: auth,
  verify: verify,
  admin: admin
};

module.exports = authController;

function auth(req, res) {
  userService.auth(req.body.name, req.body.password)
    .then(function(user){
      var token = jwt.sign(user, config.SECRET, {
        expiresIn: 1440 * 1000 // expires in 24 hours
      });

      res.json({success: true, data: {token: token}});
    })
    .catch(function(err){
      res.json({error: err});
    });
};

function verify(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(!token) {
    helper.responseError(res, errorHandler().authenticationError());
    return;
  }

  jwt.verify(token, config.SECRET, function(err, decoded) {
      if(err) helper.responseError(res, errorHandler().authenticationError());
      if(decoded) {
        req.tokenDecoded = decoded;
        next();
      }
   });
};

function admin(req, res, next) {
  var permission = req.tokenDecoded && req.tokenDecoded.admin;

  if(!permission) {
    helper.responseError(res, errorHandler().authenticationError("Insufficient Permission"));
    return;
  }

  next();
};
