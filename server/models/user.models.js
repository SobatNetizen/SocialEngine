var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    companyName: String,
},{
    timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;