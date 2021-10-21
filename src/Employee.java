public class Employee {
	private Appointment[] appointments;
	private String _name;
	private int _id;

	Employee(String name){
		_name = name;
	}
	
	/**
	* See all apointments assigned to employee
	* @return array of appointments
	*/
	public Appointment[] getAllAppointments(){
		return null;	
	}

	/**
	* Reassign appointment to another employee
	* @return true if employee can take on new appointment
	*/
	public boolean reassignAppointment(int employeeID){
		return false;	
	}

	/**
	* Close an appointment
	* @return true if appointment closes succesfully
	*/
	
	public boolean closeAppointment(Appointment appointment){
		return false;	
	}

	
}
