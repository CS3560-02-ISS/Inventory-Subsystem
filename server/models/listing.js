class Listing {
    constructor(make, model, year, price) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.price = price;
    }
}

function createListing(json) {
    return new Listing(json.make, json.model, json.year, json.price);
}

exports.createListing = createListing;