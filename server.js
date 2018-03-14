var express = require('express');
let https = require ('https');
var bodyParser = require('body-parser');  
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname);
var User = require('./models/user');

app.use(express.static(rootPath));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());  

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening at localhost:3000...");

app.get('/api/get', function(req, res) {
	var response = {
		'hello': 'world'
	};

	res.json(response);
});