'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var router = require('./modules/router');
var config = require('./config');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(config.DATABASE);

var port = process.env.PORT || 8080;
app.use('/api', router);
app.listen(port);
