import java.util.HashMap; import java.util.Date; import java.util.Map;
public class ConsoleAPI {
	public static void main(String args[]){
		Payment pay = new Payment(5000.0);
		Customer alec = InventorySystem.createCustomer("alecpooh", "12345", pay);
		InventorySystem.createCustomer("jombo", "6789", pay);
		HashMap<Integer, Customer> customers = InventorySystem.getCustomers();

		for(Map.Entry<Integer, Customer> entry : customers.entrySet()){
			int key = entry.getKey(); Customer value = entry.getValue(); System.out.printf("%d, %s\n", key, value);
		}

		Listing listing = InventorySystem.createListing("Mazda", "Miata", 1998, 5000.0);
		Vehicle v1 = new Vehicle("abc123");
		Vehicle v2 = new Vehicle("dfg456");
		Vehicle v3 = new Vehicle("hjk789");
		Vehicle[] vehicles = {v1, v2, v3};
		listing.addStock(vehicles);
		HashMap<Integer, Vehicle> vehicleMap = listing.getCurrentStock();

		for(Map.Entry<Integer, Vehicle> entry : vehicleMap.entrySet()){
			int key = entry.getKey();
			Vehicle value = entry.getValue();
			System.out.printf("%d, %s\n", key, value);
		}

		Date today = new Date();
		System.out.println(InventorySystem.createTransaction(alec, listing, today));

		for(Map.Entry<Integer, Vehicle> entry : vehicleMap.entrySet()){
			int key = entry.getKey();
			Vehicle value = entry.getValue();
			System.out.printf("%d, %s\n", key, value);
		}
		
	}
}
