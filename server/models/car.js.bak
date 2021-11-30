class Car {
    constructor(listing_id, vin, color) {
        this.listing_id = listing_id;
        this.color = color;
        this.vin = vin;
    }
}

function carFromJson(json) {
    return new Car(json.listing_id, json.vin, json.color);
}

exports.carFromJson = carFromJson;