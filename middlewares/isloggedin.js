const jwt = require('jsonwebtoken');
const usermodel = require('../models/user-model');

module.exports = async (req,res ,next) =>{
    if(!req.cookies.token){
        req.flash("error","You need to login First");
        return res.redirect("/login");
    }

    try{
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await usermodel
        .findOne({email:decoded.email})
        .select("-password");
        req.user = user;
        next();
    }catch(err){
        req.flash("error","something went wrong.");
        req.redirect("/login");
    }

}