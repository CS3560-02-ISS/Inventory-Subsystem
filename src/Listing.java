import java.util.HashMap;
import java.util.Date;

public class Listing {

	private String _make;
	private String _model;
	private int _year;
	private int _stockAmount;
	private int _appointmentCount;
	private double _price;

	// temporary storage method
	private HashMap<Integer, Vehicle> _stock;
	private int _stockCount;

	/**
	 * Create new listing.
	 * Note: Every listing starts with a zero stock.
	 * Stock must be added to a listing via the addStock() method.
	 */
	Listing(String make, String model, int year, double price){
		_make = make;
		_model = model;
		_stockAmount = 0;
		_appointmentCount = 0;
		_stockCount = 0;
		_stock = new HashMap<>();
		_price = price;
	}

	public double getPrice(){
		return _price;
	}

	public int getAmountOfStock(){
		return _stockAmount;
	}

	/**
	* Check current stock
	* @return all cars belonging to this listing
	*/
	public HashMap<Integer, Vehicle> getCurrentStock(){
		return _stock;
	}

	/** 
	* Add stock to the listing
	* @return true if stock added successfully
	*/
	public boolean addStock(Vehicle[] cars){
		for(int c=0; c <cars.length; c++){
			_stock.put(_stockCount, cars[c]);
			_stockCount++;
			_stockAmount++;
		}
		return true;
	}

	/**
	 * Get the next available car for this listing
	 * @return next vehicle, null if no cars are in stock
	 */
	public Vehicle nextCar(){
		Vehicle v = null;
		if(_stockAmount != 0){
			v = _stock.remove(--_stockAmount);
		}
		return v;
	}

}
