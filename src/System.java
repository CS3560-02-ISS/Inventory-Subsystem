import java.util.HashMap;
import java.util.Date;

public static class System {

	/* untill we have a database, I'm storing info into maps*/
	private static HashMap<int, Customer> _customers = new HashMap<>();
	private static HashMap<int, Employee> _employees = new HashMap<>();
	private static HashMap<int, Lisitng> _listings = new HashMap<>();
	private static HashMap<int, Transaction> _transaction = new HashMap<>();
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
		Customer customer = new Customer(_customerCount, username, password, payment);
		_customers.put(_customerCount, customer);
		_customerCount++;
		return customer;
	}

	/**
	* Create new employee and add to storage
	* @return employee, null if unsuccessful
	*/
	public static Employee createEmployee(String name, int id){
		Employee employee = new Employee(id, name);
		_employees.put(_employeeCount, employee);
		_employeeCount++;
		return employee;
	}

	/**
	* Create new transaction and add  to storage
	* @param customer customer purchasing vehicle
	* @param listing desired car
	* @return transaction, null if otherwise
	*/
	public static Transaction createTransaction(Customer customer, Listing listing, Date date){	
		Transaction transaction = new Transaction(transactionCount, listing.getVin(), listing.getAmount(), date, customer.getID()); 
		_transactions.put(transactionCount, transaction);
		_transactionCount++;
		return transaction;
	}

	/**
	 * Create new listing
	 * @param make String car make
	 * @param model String car model
	 * @param year int car year
	 * @return listing, null if otherwise
	 */
	public static Listing createListing(String make, String model, int year, int count){
		Listing listing = new Listing(_listingCount, make, model, year);
		_listings.put(_listingCount, listing);
		_listingCount++;
		return listing;
	}

	public static HashMap<int, Customer> getCustomers(){
		return _customers;	
	}

	public static HashMap<int, Employee> getEmployees(){
		return _employees;
	}

	public static HashMap<int, Transaction> getTransactions(){
		return _trasactions;
	}

	public static HashMap<int, Listing> getListings(){
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
	
	
