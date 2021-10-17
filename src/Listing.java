import java.util.HashMap;

public class Listing {
	private String _make;
	private String _model;
	private int _year;
	private int _stockCount;
	private int _id;
	private int _appointmentCount;
	private HashMap<String, Vehicle> _stock;

	/**
	 * Create new listing.
	 * Note: Every listing starts with a zero stock.
	 * Stock must be added to a listing via the addStock() method.
	 */
	Listing(int id, String make, String model, int year){
		_id = id;
		_make = make;
		_model = model;
		_stockCount = 0;
		_appointmentCount = 0;
		_stock = new HashMap<>();
	}

	/**
	* Check current stock
	* @return amount of stock
	*/
	public int getCurrentStock(){
		return _stockCount;
	}

	/** 
	* Add stock to the listing
	* @return true if stock added successfully
	*/
	public boolean addStock(Car[] cars){
		return false;
	}	

}
