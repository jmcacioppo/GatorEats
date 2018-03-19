var express = require('express');
var bodyParser = require('body-parser');  
var path = require('path');
var mongoose = require('mongoose');
var User = require('./js/model/user');
var routes = require('./js/routes');
var config = require('./js/config/config');

// Start app and set path to get index.html
var app = express();
var rootPath = path.normalize(__dirname);
app.use(express.static(rootPath));

// Used to get data from POST
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

// Connect to database
mongoose.connect(config.uri);

// Set port
var port = process.env.PORT || 3000;

// Define a prefix for all routes
app.use('/', routes);

// Start server
app.listen(port);
console.log("Listening at localhost:3000...");