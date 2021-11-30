
const db = require('../db');

var express = require('express'),
    router = express.Router();

var carFactory = require("../models/car");


// GET
router.get("/cars", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        const result = await db.pool.query(`select * from cars`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// GET
router.get("/cars/:stock_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let stock_id = req.params["stock_id"];
        const result = await db.pool.query(`select * from cars where stock_id = ${stock_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST
router.post("/cars", async function (req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let car = carFactory.carFromJson(req.body);
        const result = await db.pool.query(`insert into cars (listing_id, vin, color) values (${car.listing_id}, \'${car.vin}\', \'${car.color}\')`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// DELETE
router.delete("/cars/:stock_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let stock_id = req.params["stock_id"];
        const result = await db.pool.query(`delete from cars where stock_id = ${stock_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
})

module.exports = router;