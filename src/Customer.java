public class Customer {
	private String _name;
	private String _address;
	private int _id;
	private String username;
	private String password;
	private Payment payment;

	Customer(...){
		// TODO	
	}

	/** 
	* Create an appointment for a car listing
	* @param listing desired car listing
	* @return newly created appointment, null if otherwise
	*/
	public Appointment makeAppointment(CarListing listing, String date){

	}

	/**
	* Purchase a car 
	*	@param listing desired car listing
	*/
	public Transaction purchaseCar(CarListing listing){

	}

	/**
	* View Cars
	* @param searchRequest 
	* @return array of matching cars
	*/
	public CarListing[] search(SearchRequest request){

	}		
	
}
