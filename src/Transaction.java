import java.util.Date;

public class Transaction {
	private String _vin;
	private double _amount;
	private Date _date;
	private int _id;
	private int _customerID;
	private int _employeeID;

	Transaction(int id, String vin, double amount, Date date, int customerID ){
		_id = id;
		_vin = vin;
		_amount = amount;
		_date = date;
		_customerID = customerID;
	}

		
}
