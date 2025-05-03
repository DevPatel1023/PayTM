const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50,
    },
    email : {
        type : String,
        unique: true,
        lowercase : true,
        minLength : 3,
        maxLength : 30,
        trim : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    phoneNo : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        maxLength : 10
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {User};