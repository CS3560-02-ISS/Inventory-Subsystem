public class Vehicle {
	private String _vin;
	private int _stockID;

	Vehicle(String vin, int stockID){
		_vin = vin;
		_stockID = stockID;
	}

	public String getVin(){
		return _vin;
	}

	@Override
	public String toString(){
		return String.format("Stock ID: %s, Vin: %s", _stockID, _vin);
	}

}
