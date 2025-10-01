const usermodel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generatetoken} = require('../utils/generatetoken');


module.exports.registeruser = async (req,res)=>{
    try{
        let {name,email,password} = req.body;

        if (!req.body.fullname || !req.body.email || !req.body.password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let user = await usermodel.findOne({email:email});
        if(user) return res.redirect("/login?error=You already have an Account, please try to Login.");

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user = await usermodel.create({
                        fullname :name,
                        email,
                        password:hash,
                    });
                    
                    let token = generatetoken(user);
                    res.cookie("token",token);
                    res.render("home", { message: "User created Successfully" });
                }
            })
        })
    }catch(err){
    res.send(err.message);
    }
}

module.exports.loginuser = async (req,res)=>{
    
    let {email,password} = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    let user = await usermodel.findOne({email:email});
    if(!user) return res.send("Email or Password is Incorrect");

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = generatetoken(user);
            res.cookie("token",token);
            res.render("home", { message: "Login Successfully" });
        }
        else{
            return res.send("Email or Password is Incorrect");
        }
    })
}

module.exports.logout = async (req,res)=>{
    res.cookie("token","");
    res.redirect("/login");
}
