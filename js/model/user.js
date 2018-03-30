var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ReviewSchema = new Schema({
	comment: String,
	rating: Number
});

var FoodItemSchema = new Schema({
	itemName: String,
	location: String,
	station: String,
	totalRating: Number,
	reviews: [ReviewSchema]
});

var UserSchema = new Schema({
    username: String,
    password: String,
    imgURL: String
});

mongoose.model('User', UserSchema);
mongoose.model('FoodItem', FoodItemSchema);