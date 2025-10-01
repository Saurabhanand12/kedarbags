const express = require('express');
const app = express();
const path = require('path');

const usermodel = require('./models/user-model');
const productmodel = require('./models/product-model')
const db = require('./config/mongoose-connection')
const cookieparser = require('cookie-parser')
const expressSession = require('express-session');
const flash = require("connect-flash");

const ownerRouter = require('./routes/ownerRouter')
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
require("dotenv").config();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));

app.use(
    expressSession({
    resave:false,
    saveUninitialized:false,
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    })
);

app.use(flash());
app.use("/owner",ownerRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);

const indexRouter = require('./routes/index');
app.use('/', indexRouter);


app.listen(5002);