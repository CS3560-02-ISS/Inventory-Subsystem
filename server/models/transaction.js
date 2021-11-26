class Transaction {
    constructor(customer_id, stock_id, transactionDate, employee_id) {
        this.customer_id = customer_id;
        this.stock_id = stock_id;
        this.transactionDate = transactionDate;
        this.employee_id = this.employee_id;
    }
}

function transactionFromJson(json) {
    return new Transaction(json.customer_id, json.stock_id, json.transactionDate, json.employee_id);
}

exports.transactionFromJson = transactionFromJson;