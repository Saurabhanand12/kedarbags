const mongoose = require('mongoose');
const debg = require('debug')("development:mongoose");      // they are use for connected is not show in terminal
const config = require('config')

mongoose
.connect(`${config.get("MONGODB_URI")}/kedarbags`)
.then(function(){
    debg("connected");
})
.catch(function(err){
    console.log(err);
});
 
module.exports = mongoose.connection;