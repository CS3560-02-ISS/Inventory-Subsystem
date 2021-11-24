const db = require('../db');
var express = require('express'),
    router = express.Router();
var bcrypt = require("bcrypt");

var employeeFactory = require("../models/employee");

const saltRounds = 10;

// POST - create customer
router.post("/employees", async function (req, res){
    res.setHeader('content-type', 'application/json');
    try{
        var employee = employeeFactory.customerFromJson(req.body);
        bcrypt.hash(employee.customerPassword, saltRounds, async function(err, hash) {
          const result = await db.pool.query(`insert into employees (employeeName, employeeAddress, employeeUsername, employeePassword) values (\"${employee.customerName}\", \"${employee.customerAddress}\", \"${employee.customerUsername}\",\"${hash}\")`)
          .catch(err => {res.send("Username taken"); throw err;});
          res.send(result);
        });
    } catch (err) {
        res.send("505");
        throw err;
    }
});


// GET - get all customers
router.get("/employees", async function (req, res){
    res.setHeader('content-type', 'application/json');
    try{
        const result = await db.pool.query(`select * from employees`);
        res.send(result);
    } catch (err) {
        res.send(505);
        throw err;
    }
});

// GET - retrieve a specirc cutsomer
router.get("/employees/:employee_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let employee_id = req.params["employee_id"];
        const result = await db.pool.query(`select * from employees where employee_id = ${employee_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// DELETE - delete a customer ( any tables with remaning customers are not affected)
router.delete("/employees/:employee_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let customer_id = req.params["employee_id"];
        const result = await db.pool.query(`delete from employees where customer_id = ${employee_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
})

// PUT - update customer name or address ( username and password are final at creation )
router.put('/employees/:employee_id', async function (req, res){
    res.setHeader('content-type', 'application/json');
    let employee = employeeFactory.createListing(req.body);
    try{    
        let employee_id = req.params["employee_id"];
        const result = await db.pool.query(`update employees set 
                                                employeeName=\"${employee.make}\", 
                                                employeeAddress=\"${employee.model}\", 
                                            where employee_id=${employee_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});



module.exports = router;