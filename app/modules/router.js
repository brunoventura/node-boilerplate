'use strict';

var express = require('express');
var authController = require('../controllers/authController');
var router = express.Router();

// User routes
var userController = require('../controllers/userController');
//router.get('/user', authController.verify, authController.admin, userController.list);
router.get('/user', userController.list);
router.get('/user/:id', userController.get);
router.post('/user', userController.create);

router.post('/authenticate', authController.auth);

// DEV USE
// Populate controller
var populateController = require('../controllers/populateController');
router.get('/populate', populateController);

module.exports = router;
