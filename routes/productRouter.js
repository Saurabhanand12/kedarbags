const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productmodel = require('../models/product-model');

router.post('/Create',upload.single("image"), async (req,res)=>{

    try{
        let {name,price ,discount, bgcolor,panelcolor,textcolor} = req.body;

    let product = await productmodel.create({
        image : req.file.buffer,
        name,
        price ,
        discount,
        bgcolor,
        panelcolor,
        textcolor, 
    });

    req.flash("success","Product Create Successfully");
    res.redirect("/owner/admin");
    }catch(err){
        res.send(err.message);
    }
});

module.exports = router;