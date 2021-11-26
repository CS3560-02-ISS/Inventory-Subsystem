class Appointment {
    constructor(listing_id, customer_id=-1, employee_id=-1, date) {
        this.listing_id = listing_id;
        this.customer_id = customer_id;
        this.employee_id = employee_id;
        this.date = date;
    }
}

function appointmentFromJson(json) {
    return new Appointment(json.listing_id, json.customer_id, json.employee_id, json.date);
}

exports.appointmentFromJson = appointmentFromJson;