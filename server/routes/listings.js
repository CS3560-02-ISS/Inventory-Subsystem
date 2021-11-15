
const db = require('../db');
const listingFactory = require('../models/listing');

var express = require('express'),
    router = express.Router();


// GET
router.get('/listings', async function(req, res) {
    res.setHeader('content-type', 'application/json');
    let make = "make";
    let model = "model";
    let year = "year";
    if(req.query["make"]){
        make = "\"" + req.query["make"] + "\"";
    }
    if(req.query["model"]){
        model = "\"" + req.query["model"] + "\"";
    }
    if(req.query["year"]){
        year = req.query["year"];
    }
    try {
        const result = await db.pool.query(`select * from listings where ` + 
                                                `make = ${make} AND ` + 
                                                `model = ${model} AND ` + 
                                                `year = ${year}`);
        res.send(JSON.stringify(result));
    } catch (err) {
        throw err;
    }
});

// GET
router.get('/listings/:listing_id', async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let listing_id = req.params["listing_id"];
        const result = await db.pool.query(`select * from listings where listing_id = ${listing_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// GET
router.get('/listings/:listing_id/cars', async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let listing_id = req.params["listing_id"];
        const result = await db.pool.query(`select * from cars where listing_id = ${listing_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// PUT
router.put('/listings/:listing_id', async function (req, res){
    res.setHeader('content-type', 'application/json');
    let listing = listingFactory.createListing(req.body);
    try{    
        let listing_id = req.params["listing_id"];
        const result = await db.pool.query(`update listings set 
                                                make=\"${listing.make}\", 
                                                model=\"${listing.model}\", 
                                                year=${listing.year},
                                                price=${listing.price}
                                            where listing_id=${listing_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST
router.post('/listings', async function(req, res) {
    let listing = listingFactory.createListing(req.body);
    try {
        const result = await db.pool.query(`insert into listings (make, model, year, price) values (
            \"${listing.make}\", \"${listing.model}\", ${listing.year}, ${listing.price})`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});


// DELETE
router.delete('/listings/:listing_id', async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let listing_id = req.params["listing_id"];
        const cars_dependecy = await db.pool.query(`select * from cars where listing_id=${listing_id}`);
        if( cars_dependecy.length != 0){
            res.send("Delete Failed: there are unsold cars tied to this listing");
            return;
        }
        const appointment_dependecy = await db.pool.query(`select * from appointments where listing_id=${listing_id}`);
        if( appointment_dependecy.length != 0){
            res.send("Delete Failed: there are upcoming appointments tied to this listing");
            return;
        }
        const result =  await db.pool.query(`delete from listings where listing_id=${listing_id}`);
        res.send(result);
    } catch (err) {
        res.statusCode = 500;
        res.send("We're sorry, something is wrong on our end");
        throw err;
    }
});




module.exports = router;