var express = require('express');
var User = require('./model/user');
 
// Get the router
var router = express.Router();

// Middleware for requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

// GET at http://localhost:3000
router.get('/', function(req, res) {
    res.json({ 
    	message: 'Welcome to the REST API' 
    });   
});


router.route('/api/get')
	.get(function(req, res) {
		var response = {
			'hello': 'world'
		};

		res.json(response);
	});

module.exports = router;
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}