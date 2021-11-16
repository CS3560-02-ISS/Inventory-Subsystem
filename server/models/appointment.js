class Appointment {
    constructor(appointment_id, listing_id, customer_id=-1, employee_id=-1) {
        this.listing_id = listing_id;
        this.appointment_id = appointment_id;
        this.customer_id = customer_id;
        this.employee_id = employee_id;
    }
}

function appointmentFromJson(json) {
    return new Appointment(json.appointment_id, json.listing_id, json.customer_id, json.employee_id);
}

exports.appointmentFromJson = appointmentFromJson;