class Card {
    constructor(card_number, civ, expiration, customer_id) {
        this.card_number = card_number;
		this.civ = civ;
		this.expiration = expiration;
		this.customer_id = customer_id;
    }
}

function cardFromJson(json) {
    return new Card(json.card_number, json.civ, json.expiration, json.customer_id);
}

exports.cardFromJson = cardFromJson;