const mongoose = require('mongoose');
const debg = require('debug')("development:mongoose");      // they are use for connected is not show in terminal
const dotenv = require('dotenv')

dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("Cant connect to MongoDB", error)
    }
}

module.exports=connectDb


