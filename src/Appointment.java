public class Appointment {
	private String _date;
	private String _time;
	private	int _employeeID;
	private int _customerID;
	private int _listingID;
	private _id;
	private Status _status;

	public enum Status{
		OPEN,
		CLOSED
	}

	Appointment(...){
		// TODO
	}

	/**
	* Cancel an appointment
	* @return true if appointment is canceled
	*/	
	public boolean cancelApointment(){
		_appointment = CLOSED;
		return true;
	}	
	
}
