var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ReviewSchema = new Schema({
	comment: String,
	rating: Number
});

var FoodItemSchema = new Schema({
	name: String,
	classification: String,
	review: [ReviewSchema]
});

var UserSchema = new Schema({
    username: String,
    password: String,
    imgURL: String
});

var MenuSchema = new Schema({
	menuName: String,
	foodItems: [FoodItemSchema]
});

mongoose.model('User', UserSchema);
mongoose.model('Menu', MenuSchema);
mongoose.model('FoodItem', FoodItemSchema);