const express = require('express');
const app = express();
const path = require('path');

const usermodel = require('./models/user-model');
const productmodel = require('./models/product-model')
const db = require('./config/mongoose-connection')
const cookieparser = require('cookie-parser')

const ownerRouter = require('./routes/ownerRouter')
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter')

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));
app.set("view engine" , "ejs");

app.use("/owner",ownerRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);


app.get('/',(req,res)=>{
    res.send("hello");
});

app.listen(5002);