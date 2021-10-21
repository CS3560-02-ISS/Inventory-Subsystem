import java.util.HashMap;
import java.util.Date;

public class InventorySystem {

	/* untill we have a database, I'm storing info into maps*/
	private static HashMap<Integer, Customer> _customers = new HashMap<>();
	private static HashMap<Integer, Employee> _employees = new HashMap<>();
	private static HashMap<Integer, Listing> _listings = new HashMap<>();
	private static HashMap<Integer, Transaction> _transactions = new HashMap<>();
	private static int _customerCount = 0;
	private static int _employeeCount = 0;
	private static int _listingCount = 0;
	private static int _transactionCount = 0;
	
	/** 
	* Launch the systems necessary startup calls
	*/
	public static void run() {

	}

	/**
	* Create new customer and add to storage
	* @return customer, null if unsuccessful
	*/
	public static Customer createCustomer(String username, String password, Payment payment){
		Customer customer = new Customer(username, password, payment);
		storeCustomer(customer);
		return customer;
	}

	/**
	 * Store a customer into memory
	 * @return true if operatiopn is succesfful
	 * */
	public static boolean storeCustomer(Customer customer){
		_customers.put(_customerCount, customer);
		_customerCount++;
		return true;
	}

	/**
	* Create new employee and add to storage
	* @return employee, null if unsuccessful
	*/
	public static Employee createEmployee(String name){
		Employee employee = new Employee(name);
		storeEmployee(employee);
		return employee;
	}

	/**
	 * Store an employee into memory
	 * @param employee
	 * @return true if operation is succesfful
	 */
	public static boolean storeEmployee(Employee employee){
		_employees.put(_employeeCount, employee);
		_employeeCount++;
		return true;
	}

	/**
	* Create new transaction and add  to storage
	* @param customer customer purchasing vehicle
	* @param listing desired car
	* @return transaction, null if otherwise
	*/
	public static Transaction createTransaction(Customer customer, Listing listing, Date date){	
		Transaction transaction = new Transaction(listing, date, customer); 
		storeTransaction(transaction);
		return transaction;
	}

	/**
	 * Store a transaction into memory
	 * @param transaction
	 * @return true if operation successfull
	 */

	public static boolean storeTransaction(Transaction transaction){
		_transactions.put(_transactionCount, transaction);
		_transactionCount++;
		return true;
	}
	

	/**
	 * Create new listing
	 * @param make String car make
	 * @param model String car model
	 * @param year int car year
	 * @return listing, null if otherwise
	 */
	public static Listing createListing(String make, String model, int year, double price){
		Listing listing = new Listing(make, model, year, price);
		storeListing(listing);
		return listing;
	}

	public static boolean storeListing(Listing listing){
		_listings.put(_listingCount, listing);
		_listingCount++;
		return true;
	}

	public static HashMap<Integer, Customer> getCustomers(){
		return _customers;	
	}

	public static HashMap<Integer, Employee> getEmployees(){
		return _employees;
	}

	public static HashMap<Integer, Transaction> getTransactions(){
		return _transactions;
	}

	public static HashMap<Integer, Listing> getListings(){
		return _listings;
	}

	public static Customer getCustomer(int ID){
		return _customers.get(ID);
	}

	public static Employee getEmployee(int ID){
		return _employees.get(ID);
	}
	
	public static Transaction getTransaction(int ID){
		return _transactions.get(ID);
	}

	public static Listing getListing(int ID){
		return _listings.get(ID);
	}
}	
	
