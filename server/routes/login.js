const db = require('../db');

var express = require('express'),
    router = express.Router();

    var bcrypt = require("bcrypt");

//restrict access to cart.html to loged in users
router.use('/cart.html', function(req, res, next) {
    console.log("1")
    if(Object.keys(req.cookies).length != 0){
        console.log("2")
        console.log('Cookies: ', req.cookies)
        if(req.cookies.auth == 'true'){
            console.log("3")
            next();
        }
    }
    else{
        console.log("4")
        res.redirect("/index.html");
    }
    console.log("5")
});

router.get('/logout', function(req, res, next){
    res.clearCookie("username");
    res.clearCookie("auth ");
    res.redirect("/index.html");
});

// POST - attempt to login
router.post('/login', async function(req, res){
    const username = req.body.customerUsername;
    const password = req.body.customerPassword;
    try{
        const result = await db.pool.query(`select customerPassword from customers where customerUsername = \"${username}\"`);
        const hash = result[0]["customerPassword"];
        bcrypt.compare(password, hash, function(err, result) {
          if(result){
            res.cookie('username', username, {maxAge: 360000});
            res.cookie('auth', true, {maxAge: 360000});
            res.redirect("/index.html");
          }
          else{
            var login = {
              "attempt": false
            }
            res.send(JSON.stringify(login));
          }
        });
    }
    catch (err){
      res.send("505");
      throw err;
    }

    /*
    bcrypt.compare(password, hash, function(err, result) {
      // result == true
    });*/
});

module.exports = router;