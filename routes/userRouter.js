const express = require('express');
const router = express.Router();
const {registeruser,loginuser,logout} = require('../controllers/authcontroller')

router.get('/',(req,res)=>{
    res.send("hey its working");
});

router.post('/login',loginuser);

router.post('/user/register',registeruser);

router.get('/logout',logout);


module.exports = router;