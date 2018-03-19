var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ReviewSchema = new Schema({
	comment: String,
	rating: Number
});

var UserSchema = new Schema({
    username: String,
    password: String
});

var MenuSchema = new Schema({
	name: String,
	classification: String,
	review: [ReviewSchema]
});

mongoose.model('User', UserSchema);
mongoose.model('Menu', MenuSchema);