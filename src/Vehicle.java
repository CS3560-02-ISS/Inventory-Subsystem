public class Vehicle {
	private String _vin;

	Vehicle(String vin){
		_vin = vin;
	}

	public String getVin(){
		return _vin;
	}

	@Override
	public String toString(){
		return String.format("Vin: %s",_vin);
	}

}
