const db = require('../db');

var express = require('express'),
    router = express.Router();

    var bcrypt = require("bcrypt");

//restrict access to cart.html to loged in users
router.use('/cart.html', function(req, res, next) {
    if(Object.keys(req.cookies).length != 0){
        if(req.cookies.auth == 'true'){
            next();
        }
    }
    else{
        res.redirect("/index.html");
    }
});


router.use("/admin/*", function(req, res, next){
  console.log("Cookies: ", req.cookies);
  if(Object.keys(req.cookies).length != 0){
    if(req.cookies.adminAuth == 'true'){
        next();
        console.log("asdfa")
    }
  }
  else{
    res.redirect("/index.html");
  }
})

router.get('/logout', function(req, res, next){
    res.clearCookie("username");
    res.clearCookie("auth ");
    res.redirect("/index.html");
});

// POST - attempt to login
router.post('/login', async function(req, res){
  res.setHeader('content-type', 'application/json');
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
});

// POST - attempt to login
router.post('/employee/login', async function(req, res){
  res.setHeader('content-type', 'application/json');
  const username = req.body.employeeUsername;
  const password = req.body.employeePassword;
  try{
      const result = await db.pool.query(`select employeePassword from employees where employeeUsername = \"${username}\"`);
      const hash = result[0]["employeePassword"];
      bcrypt.compare(password, hash, function(err, result) {
        if(result){
          res.cookie('username', username, {maxAge: 360000});
          res.cookie('adminAuth', true, {maxAge: 360000});
          var login = {
            "attempt": true
          }
          res.send(JSON.stringify(login));
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
    var login = {
      "attempt": 'unknown'
    }
    res.send(JSON.stringify(login));
    throw err;
  }
});

module.exports = router;