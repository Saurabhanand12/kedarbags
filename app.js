const express = require('express');
const app = express();
const path = require('path');

const connectDb=require('./config/mongoose-connection')

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
app.use(express.static('public'));


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

connectDb()

app.listen(5002);

module.exports = app;


// <% products.forEach(function(product) { %>
//                             <div class="bg-warning m-3 rounded d-flex flex-column align-items-center" style="width: 290px; height: 400px;">
//                                 <img src="<%= product.image %>" alt="<%= product.name %>" 
//                                     style="width: 250px; height:220px; object-fit: cover;" 
//                                     class="bg-white mx-auto mt-3 rounded">
//                                 <div class="mt-3 fw-bold h4"><%= product.name %></div>
//                                 <div>$<%= product.price %></div>
//                                     <a href="#"  class="mt-4 text-white fw-bold d-inline-block text-center" 
//                                         style="width: 250px; height: 42px; line-height: 42px; border-radius: 20px; background-color: black; border:2px solid black; text-decoration: none;">
//                                         Add to Cart
//                                     </a>
//                             </div>
//                         <% }) %>