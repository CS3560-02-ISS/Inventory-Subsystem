public class Customer {
	private String _name;
	private String _address;
	private int _id;
	private String username;
	private String password;
	private Payment payment;

	Customer(int id, String username, String password, Payment payment){
		_id = id;
		_username = username;
		_password = password;
		_payment = payment;
	}

	/** 
	* Create an appointment for a car listing
	* @param listing desired car listing
	* @return newly created appointment, null if otherwise
	*/
	public Appointment makeAppointment(Listing listing, String date){
		return null;
	}

	/**
	* Purchase a car 
	*	@param listing desired car listing
	*/
	public Transaction purchaseCar(Listing listing){
		return null;
	}

	/**
	* View Cars
	* @param searchRequest 
	* @return array of matching cars
	*/
	public Listing[] search(SearchRequest request){
		return null;
	}		
	
}
