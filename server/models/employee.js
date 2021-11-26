var hash = require('pbkdf2-password')();

class Employee {
    constructor(employeeName, employeeAddress, employeeUsername, employeePassword) {
        this.employeeName = employeeName;
        this.employeeAddress = employeeAddress;
        this.employeeUsername = employeeUsername;
        this.employeePassword = employeePassword;
    }
}

function employeeFromJson(json) {
    return new Employee(json.employeeName, json.employeeAddress, json.employeeUsername, json.employeePassword);

}

exports.employeeFromJson = employeeFromJson;