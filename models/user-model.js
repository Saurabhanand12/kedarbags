const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URI);

const userschema = mongoose.Schema({
    fullname :{
        type:String,
        minlength :3,
        trim:true,
    },
    email:String,
    password:String,
    cart:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        }
    ],
    product: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }
    ],
    order:{
        type:Array,
        default:[]
    },
    contact:Number,
    Picture:String,
});

module.exports = mongoose.model("user",userschema);