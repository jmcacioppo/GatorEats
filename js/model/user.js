var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var userSchema   = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    dateOfBirth: Date,
    weight: Number,
    height: Number, 
    email: String
});
 
module.exports = mongoose.model('User', userSchema);