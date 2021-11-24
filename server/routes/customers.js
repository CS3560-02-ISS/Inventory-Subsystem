const db = require('../db');
var express = require('express'),
    router = express.Router();
var bcrypt = require("bcrypt");

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

// GET - get all customers
router.get("/customers", async function (req, res){
    res.setHeader('content-type', 'application/json');
    try{
        const result = await db.pool.query(`select * from customers`);
        res.send(result);
    } catch (err) {
        res.send(505);
        throw err;
    }
});

// GET - retrieve a specirc cutsomer
router.get("/customers/:customer_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let customer_id = req.params["customer_id"];
        const result = await db.pool.query(`select * from customers where customer_id = ${customer_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// DELETE - delete a customer ( any tables with remaning customers are not affected)
router.delete("/customers/:customer_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let customer_id = req.params["customer_id"];
        const result = await db.pool.query(`delete from customers where customer_id = ${customer_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
})

// PUT - update customer name or address ( username and password are final at creation )
router.put('/customers/:customer_id', async function (req, res){
    res.setHeader('content-type', 'application/json');
    let customer = customerFactory.createListing(req.body);
    try{    
        let customer_id = req.params["customer_id"];
        const result = await db.pool.query(`update customers set 
                                                customerName=\"${listing.make}\", 
                                                customerAddress=\"${listing.model}\", 
                                            where customer_id=${customer_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});



module.exports = router;