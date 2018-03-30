var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ReviewSchema = new Schema({
	comment: String,
	rating: Number,
	reviewerUsername: String,
	reviewerImgURL: String
});

var DietaryRestrictionsSchema = new Schema({
	vegetarian: Boolean,
	vegan: Boolean,
	nutFree: Boolean,
	dairyFree: Boolean,
	glutenFree: Boolean,
	paleo: Boolean
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
	imgURL: String,
	dietaryRestrictions: DietaryRestrictionsSchema
});

mongoose.model('User', UserSchema);
mongoose.model('FoodItem', FoodItemSchema);