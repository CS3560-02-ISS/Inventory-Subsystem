
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
    let date = "date";
    if(req.query["customer_id"]){
        customer_id = req.query["customer_id"] ;
    }
    if(req.query["listing_id"]){
        listing_id = req.query["listing_id"] ;
    }
    if(req.query["employee_id"]){
        employee_id = req.query["employee_id"];
    }
    if(req.query["date"]){
        date = req.query["date"];
    }
    try {
        const result = await db.pool.query(`select * from appointments where ` + 
                                                `customer_id = ${customer_id} AND ` + 
                                                `listing_id = ${listing_id} AND ` + 
                                                `date = ${date} AND ` + 
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
		console.log(`select count(*) from cars where listing_id = ${appointment.listing_id}`);
		const r1 = await db.pool.query(`select count(*) from cars where listing_id = ${appointment.listing_id}`);
		console.log(r1[0]["count(*)"]);
		if(r1[0]["count(*)"] == 0){
			res.send(JSON.stringify({affectedRows: 0}));
		}
		else{
			const result = await db.pool.query(`insert into appointments (listing_id, customer_id, employee_id, date) values (${appointment.listing_id}, ${appointment.customer_id}, ${appointment.employee_id}, \"${appointment.date}\")`);
			res.send(result);
		}
    } catch (err) {
        throw err;
    }
});

// PUT - update customer name or address ( username and password are final at creation )
router.put('/appointments/:appointment_id', async function (req, res){
    res.setHeader('content-type', 'application/json');
    let appointment = appointmentFactory.appointmentFromJson(req.body);
    try{    
        let appointment_id = req.params["appointment_id"];
        const result = await db.pool.query(`update appointments set `
											+ `customer_id=${appointment.customer_id}, `
											+ `employee_id=${appointment.employee_id}, `
											+ `listing_id=${appointment.listing_id}, `
											+ `date=\"${appointment.date}\" ` 											
											+ `where appointment_id=${req.params["appointment_id"]}`);
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
        const result = await db.pool.query(`delete from appointments where appointment_id = ${appointment_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
})

module.exports = router;