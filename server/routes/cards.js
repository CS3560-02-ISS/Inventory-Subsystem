
const db = require('../db');

var express = require('express'),
    router = express.Router();

var cardFactory = require("../models/card");


// GET
router.get("/cards", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        const card = await db.pool.query(`select * from cards`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// GET
router.get("/cards/:card_number", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let card_number = req.params["card_number"];
        const result = await db.pool.query(`select * from cards where card_number = ${card_number}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST
router.post("/cards", async function (req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let card = cardFactory.cardFromJson(req.body);
        const result = await db.pool.query(`insert into cards (card_number, civ, expiration, customer_id) values (${card.card_number}, ${card.civ}, ${card.expiration}, ${card.customer_id})`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// PUT
router.put('/cards/:card_number', async function (req, res){
    res.setHeader('content-type', 'application/json');
    let card = cardFactory.cardFromJson(req.body);
    try{    
        let card_number = req.params["card_number"];
        const result = await db.pool.query(`update cards set `
											+ `customer_id=${card.customer_id}, `
											+ `card_number=${card.card_number}, `
											+ `civ=${card.civ}, `
											+ `expiration=\"${card.expiration}\" ` 											
											+ `where card_number=${card_number}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});


// DELETE
router.delete("/cards/:card_number", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let card_number = req.params["card_number"];
        const result = await db.pool.query(`delete from cards where card_number = ${card_number}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
})

module.exports = router;