const express = require('express');
const router = express.Router();
const usermodel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generatetoken} = require('../utils/generatetoken');
const { registeruser,loginuser,logout} = require('../controllers/authcontroller');
const isloggedin = require('../middlewares/isloggedin');
const productmodel = require('../models/product-model');


router.get('/',(req,res)=>{
    let error = req.flash("error");
    res.render("index",{error});
});

router.post('/user/register',registeruser);

router.get('/login',(req,res)=>{
    res.render("login");
});
router.post('/login',loginuser);

router.get('/home',isloggedin,(req,res)=>{
    res.render("home");
});

router.get('/logout',logout);


router.get('/admin',(req,res)=>{
    res.render("admin");
});

router.get('/shop', isloggedin,async(req,res)=>{
    let product = await productmodel.find();
    let success = req.flash("success");
    res.render("shop",{product,success});
});


router.get('/addtoproduct/:productid', isloggedin, async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.user.email });
    const product = await productmodel.findById(req.params.productid);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/shop");
    }

    // Avoid duplicates
    if (!user.cart.includes(req.params.productid)) {
      user.cart.push(req.params.productid);
      await user.save();
      req.flash("success", "Added to Cart");
    } else {
      req.flash("info", "Product already in cart");
    }
    res.redirect("/shop");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong");
    res.redirect("/shop");
  }
});

router.get("/cart",isloggedin,async (req,res)=>{
    let user = await usermodel.findOne({email:req.user.email}).populate("cart");

    if (!user || !user.cart || user.cart.length === 0) {
      return res.render("cart", { user, bill: 0 });
    }
    let subtotal = 0;
    user.cart.forEach(item => {
    subtotal += (item.price || 0) * (item.qty || 1);
    });

   let bill = subtotal + 20;

   res.render("cart",{user,bill,empty: false,subtotal});
});


router.get("/bags/:id", async (req, res) => {
  try {
    const product = await productmodel.findById(req.params.id); // find the product by ID
    if (!product) return res.status(404).send("Product not found");

    res.render("product", { product }); // render product.ejs for this product only
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


router.get("/removefromcart/:productid", isloggedin, async (req, res) => {
  try {
    let user = await usermodel.findOne({ email: req.user.email });

    // Remove first occurrence of the product
    const index = user.cart.indexOf(req.params.productid);
    if (index > -1) {
      user.cart.splice(index, 1);
    }

    await user.save();
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
});

router.get('/profile',(req,res)=>{
    res.render("profile");
});


module.exports = router; 