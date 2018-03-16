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

// http://localhost:3000/users
router.route('/api/users')
	// GET all users
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) res.send(err);
            res.json(users);
        });
    })

    // POST to create a user
    .post(function(req, res) {
        var user = new User();

        // Set text and user values from request
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
 
        // Save user and check for errors
        user.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'User created successfully!' });
        });
    });


// http://localhost:3000/users/:user_id
router.route('/api/users/:user_id')
    // GET user with id   
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    })

    // PUT to update user with id
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            
            // Update the user text
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            
            user.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'User successfully updated!' });
            });
 
        });
    })

    // DELETE user with id
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted user!' });
        });
    });


module.exports = router;
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
