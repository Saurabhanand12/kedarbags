const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/kedarbags");

const userschema = mongoose.Schema({
    fullname :{
        type:String,
        minlength :3,
        trim:true,
    },
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[],
    },
    isadmin:Boolean,
    order:{
        type:Array,
        default:[]
    },
    contact:Number,
    Picture:String,
});

module.exports = mongoose.model("user",userschema);