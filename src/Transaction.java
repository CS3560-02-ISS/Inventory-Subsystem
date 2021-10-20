import java.util.Date;

public class Transaction {
	private Vehicle _vehicle;
	private double _amount;
	private Date _date;
	private int _id;
	private int _customerID;
	private int _employeeID;

	Transaction(int id, Listing listing, Date date, int customerID ){
		_id = id;
		_date = date;
		_customerID = customerID;
		_vehicle = listing.nextCar();
		_amount = listing.getPrice();

	}

	@Override
	public String toString(){
		return _vehicle.getVin() + ", " +  _amount + ", " +  _customerID + ", " +  _date;
	}
}
