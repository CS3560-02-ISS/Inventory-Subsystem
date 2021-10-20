public class Payment{
	private Type _type;
	private Card _card;
	private double _cashAmount;

	public enum Type{
		CARD,
		CASH
	}

	Payment(double cashAmount){
		_type = Type.CASH;
		_cashAmount = cashAmount;
	}

	Payment(String cardNumber, String expiration, int code, String name){
		_card = new Card(cardNumber, expiration, code, name);
		_type = Type.CARD;
	}

	Payment(Card card){
		_card = card;
	}

	public class Card{
		private String _cardNumber;
		private String _expiration;
		private int _code;
		private String _name;

		Card(String cardNumber, String expiration, int code, String name){
			_cardNumber = cardNumber;
			_expiration = _expiration;
			_code = code;
			_name = name;
		}
	}
		
}
