var express = require("express");
var url = require("url");
var app = express();
var PORT = 8080;
var listingRotues = require("./routes/listings");
var router = express.Router();


router.use(function logActivity( req, res, next){
    var date = new Date().toUTCString();
    console.log(`${date}: \x1b[32m${req.method}\x1b[0m \x1b[34m${req.path}\x1b[0m ${req.params}\n\t\t \x1b[35m${req.body}\x1b[0m `);
    next();
});

app.use(express.json())
app.use(router);
app.use(listingRotues);


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
