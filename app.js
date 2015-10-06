'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var router = require('./app/modules/router');
var config = require('./config');
var app = express();

app.use('/api', router);
app.use('/', express.static('static'));
app.use('/*', function(req, res) {
  res.sendFile(__dirname + '/static/index.html');
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(config.DATABASE);

var port = process.env.PORT || 8080;
app.listen(port);
