var hash = require('pbkdf2-password')();

class Customer {
    constructor(customerName, customerAddress, customerUsername, customerPassword) {
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.customerUsername = customerUsername;
        this.customerPassword = customerPassword;
    }
}

function customerFromJson(json) {
    /*var userSalt;
    var userHash;

    hash({ password: json.password }, function (err, pass, salt, hash) {
        if (err) throw err;
        // store the salt & hash in the "db"
        //console.log("salt: ", salt)
        //console.log("hash: ", hash)
        userSalt = toString(salt);
        userHash = toString(hash);
    });
    console.log("salt: ", userSalt);
    console.log("hash: ", userHash);*/
    return new Customer(json.customerName, json.customerAddress, json.customerUsername, json.customerPassword);

}

exports.customerFromJson = customerFromJson;