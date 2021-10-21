import java.util.Date;

public class Transaction {
	private Vehicle _vehicle;
	private double _amount;
	private Date _date;
	private Customer _customer;
	private int _employeeID;

	Transaction(Listing listing, Date date, Customer customer){
		_date = date;
		_customer = customer;
		_vehicle = listing.nextCar();
		_amount = listing.getPrice();

	}

	@Override
	public String toString(){
		return _vehicle.getVin() + ", " +  _amount + ", " +  _customer + ", " +  _date;
	}
}
