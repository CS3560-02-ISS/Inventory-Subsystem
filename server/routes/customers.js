const db = require('../db');
var express = require('express'),
    router = express.Router();
var bcrypt = require("bcrypt");
const session = require('express-session');

var customerFactory = require("../models/customer");

const saltRounds = 10;

// POST - create customer
router.post("/customers", async function (req, res){
    res.setHeader('content-type', 'application/json');
    try{
        var customer = customerFactory.customerFromJson(req.body);
        bcrypt.hash(customer.customerPassword, saltRounds, async function(err, hash) {
          const result = await db.pool.query(`insert into customers (customerName, customerAddress, customerUsername, customerPassword) values (\"${customer.customerName}\", \"${customer.customerAddress}\", \"${customer.customerUsername}\",\"${hash}\")`)
          .catch(err => {res.send("Username taken"); throw err;});
          res.send(result);
        });
    } catch (err) {
        res.send("505");
        throw err;
    }
});



module.exports = router;