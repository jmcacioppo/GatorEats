var express = require('express'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FoodItem = mongoose.model('FoodItem');

// Get the router
var router = express.Router();

// Middleware for requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

// GET at root
router.get('/', function(req, res) {
    res.json({ 
    	message: 'Welcome to the REST API' 
    });   
});

// USER ROUTES
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
        User.find({ 'username' : req.body.username }, function(err, user) {
            if(err) res.send(err);

            if(user.length > 0) res.json({'message' : 'User already exists'});
            else {
            	var newUser = new User();

		        // Set text and user values from request
		        newUser.username = req.body.username;
		        newUser.password = req.body.password;
		 
		        // Save user and check for errors
		        newUser.save(function(err) {
		            if (err) res.send(err);
		            res.json(newUser);
		        });
            }
        });
    });

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
            user.username = req.body.username;
        	user.password = req.body.password;
            
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

// FOOD ITEM ROUTES
router.route('/api/foodItems')
	// GET all food items
    .get(function(req, res) {
        FoodItem.find(function(err, foodItems) {
            if (err) res.send(err);
            res.json(foodItems);
        });
    })

    // POST to create a food item
    .post(function(req, res) {
        var foodItem = new FoodItem();

        // Set text and food item values from request
        foodItem.itemName = req.body.itemName;
        foodItem.location = req.body.location;
        foodItem.station = req.body.station;
        foodItem.reviews.push(req.body.review);
        foodItem.totalRating = req.body.review.rating;
 
        // Save food item and check for errors
        foodItem.save(function(err) {
            if (err) res.send(err);
            res.json(foodItem);
        });
    });

router.route('/api/foodItems/:foodItem_id')
    // GET food item with id   
    .get(function(req, res) {
        FoodItem.findById(req.params.foodItem_id, function(err, foodItem) {
            if (err) res.send(err);
            res.json(foodItem);
        });
    })

    // PUT to update food item with id
    .put(function(req, res) {
        FoodItem.findById(req.params.foodItem_id, function(err, foodItem) {
            if (err) res.send(err);
            
            // Update the food item text
            foodItem.reviews.push(req.body.review);
            
            var total = 0;
            for(var i = 0; i < foodItem.reviews.length; i++) {
                total += foodItem.reviews[i].rating;
            }
    
            foodItem.totalRating = total / foodItem.reviews.length;
            
            foodItem.save(function(err) {
                if (err) res.send(err);
                res.json(foodItem);
            });
 
        });
    })

    // DELETE food item with id
    .delete(function(req, res) {
        FoodItem.remove({
            _id: req.params.foodItem_id
        }, function(err, foodItem) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted foodItem!' });
        });
    });

// TRENDING LEADERBOARD ROUTE
router.route('/api/leaderboard')
    // GET leaderboard 
    .get(function(req, res) {
		FoodItem.find({}, function (err, foodItems) {
			if (err) res.send(err);
			else {
				foodItems.sort(function(a, b) {
					return b.totalRating - a.totalRating;
				});

			  	res.send({'trending': foodItems});
			}
		});
    })

module.exports = router;
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
