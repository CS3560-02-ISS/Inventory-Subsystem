
const db = require('../db');

var express = require('express'),
    router = express.Router();

var transactionFactory = require("../models/transaction");

// GET
router.get('/transactions', async function(req, res) {
    res.setHeader('content-type', 'application/json');
    let customer_id = "customer_id";
    let stock_id = "stock_id";
    let transactionDate = "transactionDate";
    if(req.query["customer_id"]){
        customer_id = req.query["customer_id"] ;
    }
    if(req.query["stock_id"]){
        stock_id = req.query["stock_id"] ;
    }
    if(req.query["transactionDate"]){
        transactionDate = "\"" + req.query["transactionDate"] + "\"";
    }
    try {
        const result = await db.pool.query(`select * from transactions where ` + 
                                                `customer_id = ${customer_id} AND ` + 
                                                `stock_id = ${stock_id} AND ` + 
                                                `transactionDate = ${transactionDate}`);
        res.send(JSON.stringify(result));
    } catch (err) {
        throw err;
    }
});

// GET
router.get("/transactions/:transaction_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let transaction_id = req.params["transaction_id"];
        const result = await db.pool.query(`select * from transactions where transaction_id = ${transaction_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// DELETE
router.delete("/transactions/:transaction_id", async function(req, res){
    res.setHeader('content-type', 'application/json');
    try{
        let transaction_id = req.params["transaction_id"];
        const result = await db.pool.query(`delete from transactions where transaction_id = ${transaction_id}`);
        res.send(result);
    } catch (err) {
        throw err;
    }
})

// POST
router.post("/transactions", async function (req, res){
    res.setHeader('content-type', 'application/json');
    const regex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    try{
        let transaction = transactionFactory.transactionFromJson(req.body);
        if(!regex.test(transaction.transactionDate)){
            res.send("Invalid date format: " + transaction.transactionDate + "\nExpected YYYY-MM-DD");
            return;
        }
        const result = await db.pool.query(`insert into transactions (customer_id, stock_id, transactionDate) values (${transaction.customer_id}, ${transaction.stock_id}, \'${transaction.transactionDate}\')`);
        res.send(result);
    } catch (err) {
        throw err;
    }
});


module.exports = router;