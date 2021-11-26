var express = require("express");
var url = require("url");
var app = express();
var PORT = 8080;
var listingRotues = require("./routes/listings");
var carRoutes = require("./routes/cars");
var transactionRotues = require("./routes/transactions");
var customerRoutes = require("./routes/customers");
var employeeRoutes = require("./routes/employees")
var loginRoutes = require("./routes/login");
var router = express.Router();

var cookieParser = require('cookie-parser');
app.use(cookieParser());


const cors = require('cors');
app.use(cors({
    origin: '*'
}));


router.use(function logActivity( req, res, next){
    var date = new Date().toUTCString();
    console.log(`${date}: `);
    console.log(`\t\x1b[32m${req.method} ${req.path}\x1b[0m`);
    console.log("\t\t", req.query);
    console.log("\t\t", req.body);
    next();
});
app.use(express.json());
app.use(router);
app.use(loginRoutes);
app.use(express.static('public'));
app.use(listingRotues);
app.use(carRoutes);
app.use(transactionRotues);
app.use(customerRoutes);
app.use(employeeRoutes);


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
