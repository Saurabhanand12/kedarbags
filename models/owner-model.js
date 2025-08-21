const mongoose = require('mongoose');

const ownerschema = mongoose.Schema({
    fullname :{
        type:String,
        minlength :3,
        trim:true,
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default:[]
    },
    contact:Number,
    Picture:String,
    gstno:String,
});

module.exports = mongoose.model("owner",ownerschema);