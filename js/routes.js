var express = require('express'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Menu = mongoose.model('Menu'),
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

            if(user.length > 0) res.json(user);
            else {
            	var newUser = new User();

		        // Set text and user values from request
		        newUser.username = req.body.username;
		        newUser.password = req.body.password;
		 
		        // Save user and check for errors
		        newUser.save(function(err) {
		            if (err) res.send(err);
		            res.json({ message: 'User created successfully!' });
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

// MENU ROUTES
router.route('/api/menus')
	// GET all menus
    .get(function(req, res) {
        Menu.find(function(err, menus) {
            if (err) res.send(err);
            res.json(menus);
        });
    })

    // POST to create a menu
    .post(function(req, res) {
        var menu = new Menu();

        // Set text and menu values from request
        menu.menuName = req.body.menuName;
        menu.foodItems = req.body.foodItems;
 
        // Save menu and check for errors
        menu.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Menu created successfully!' });
        });
    });

router.route('/api/menus/:menu_id')
    // GET menu with id   
    .get(function(req, res) {
        Menu.findById(req.params.menu_id, function(err, menu) {
            if (err) res.send(err);
            res.json(menu);
        });
    })

    // PUT to update menu with id
    .put(function(req, res) {
        Menu.findById(req.params.menu_id, function(err, menu) {
            if (err) res.send(err);
            
            // Update the menu text
            menu.menuName = req.body.menuName;
        	menu.foodItems = req.body.foodItems;
            
            menu.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'Menu successfully updated!' });
            });
 
        });
    })

    // DELETE menu with id
    .delete(function(req, res) {
        Menu.remove({
            _id: req.params.menu_id
        }, function(err, menu) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted menu!' });
        });
    });

// FOOD ITEM ROUTES
router.route('/api/foodItem/:foodItem_id')
    // GET foodItem with id   
    .get(function(req, res) {
        FoodItem.findById(req.params.foodItem_id, function(err, foodItem) {
            if (err) res.send(err);
            res.json(foodItem);
        });
    })

    // PUT to update foodItem with id
    .put(function(req, res) {
        Menu.findById(req.params.foodItem_id, function(err, foodItem) {
            if (err) res.send(err);
            
            // Update the foodItem text
            foodItem.name = req.body.name;
        	foodItem.classification = req.body.classification;
        	foodItem.review = req.body.review;
            
            foodItem.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'Menu successfully updated!' });
            });
 
        });
    })

    // DELETE foodItem with id
    .delete(function(req, res) {
        Menu.remove({
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
					return b.review.rating - a.review.rating;
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
