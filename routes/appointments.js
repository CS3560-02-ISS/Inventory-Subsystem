
const db = require('../db');

var express = require('express'),
    router = express.Router();

var appointmentFactory = require("../models/appointment");


// GET
router.get('/appointments', async function(req, res) {
    res.setHeader('content-type', 'application/json');
    let customer_id = "customer_id";
    let listing_id = "listing_id";
    let employee_id = "employee_id";
    if(req.query["customer_id"] != -1){
        customer_id = req.query["customer_id"] ;
    }
    if(req.query["listing_id"]){
        listing_id = req.query["listing_id"] ;
    }
    if(req.query["employee_id"] != -1){
        employee_id = req.query["employee_id"];
    }
    try {
        const result = await db.pool.query(`select * from transactions where ` + 
                                                `customer_id = ${customer_id} AND ` + 
                                                `listing_id = ${listing_id} AND ` + 
                                                `employee_id = ${employee_id}`);
        res.send(JSON.stringify(result));
    } catch (err) {
        throw err;
    }
});

// GET
router.get("/appointments/:appointment_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let appointment_id = req.params["appointment_id"];
        const result = await db.pool.query(`select * from appointments where appointment_id = ${appointment_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST
router.post("/appointments", async function (req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let appointment = appointmentFactory.appointmentFromJson(req.body);
        const result = await db.pool.query(`insert into appointments (listing_id, customer_id, employee_id) values (${appointment.listing_id}, ${appointment.customer_id}, ${appointment.employee_id})`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// DELETE
router.delete("/appointments/:appointment_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let appointment_id = req.params["appointment_id"];
        const result = await db.pool.query(`delete from appointments where stock_id = ${appointment_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
})

module.exports = router;