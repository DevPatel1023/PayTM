//account table : user table ref key and balance 
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    balance : {
        type : Number,
        default : 0,    
        required: true
    }
    
},{timestamps : true});

module.exports = mongoose.model("Account",accountSchema);