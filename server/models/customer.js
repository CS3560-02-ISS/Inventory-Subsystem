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

    return new Customer(json.customerName, json.customerAddress, json.customerUsername, json.customerPassword);

}

exports.customerFromJson = customerFromJson;