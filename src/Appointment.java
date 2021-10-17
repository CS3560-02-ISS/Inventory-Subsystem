public class Appointment {
	private Date _date;
	private	int _employeeID;
	private int _customerID;
	private int _listingID;
	private _id;
	private Status _status;

	public enum Status{
		OPEN,
		CLOSED
	}

	Appointment(int id, Date date, int employeeID, int customerID, int listingID, ){
		_id = id;
		_date = date;
		_employeeID = employeeID;
		_customerID = customerID;
		_listingID = listingID;
		_status = Status.OPEN;
	}

	/**
	* Cancel an appointment
	* @return true if appointment is canceled
	*/	
	public boolean cancelApointment(){
		_status = Satus.CLOSED;
		return true;
	}	
	
}
