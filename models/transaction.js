class Transaction {
    constructor(customer_id, stock_id, transactionDate) {
        this.customer_id = customer_id;
        this.stock_id = stock_id;
        this.transactionDate = transactionDate;
    }
}

function transactionFromJson(json) {
    return new Transaction(json.customer_id, json.stock_id, json.transactionDate);
}

exports.transactionFromJson = transactionFromJson;