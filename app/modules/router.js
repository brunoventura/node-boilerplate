'use strict';

var express = require('express');
var authController = require('../controllers/authController');
var router = express.Router();

// User routes
var userController = require('../controllers/userController');
router.get('/user', authController.verify, authController.admin, userController.listUsers);
router.get('/user/:id', userController.getUser);

router.post('/authenticate', authController.auth);

// DEV USE
// Populate controller
var populateController = require('../controllers/populateController');
router.get('/populate', populateController);

module.exports = router;
