CREATE DATABASE iss;
USE iss;

CREATE TABLE customers( 
	customer_id 		INT NOT NULL AUTO_INCREMENT,
	customerName 		VARCHAR(30) NOT NULL,
	customerAddress 	VARCHAR(50) NOT NULL,
	customerUsername	VARCHAR(30) NOT NULL,
	customerPassword 	TEXT,
	PRIMARY KEY(customer_id),
	UNIQUE(customerUsername)
);

CREATE TABLE employees(
	employee_id 	INT NOT NULL AUTO_INCREMENT,
	employeeName	VARCHAR(20) NOT NULL,
	employeeUsername VARCHAR(20) NOT NULL,
	employeePassword VARCHAR(20) NOT NULL,
	PRIMARY KEY (employee_id)
);

CREATE TABLE listings(
	listing_id 	INT NOT NULL AUTO_INCREMENT,
	make		VARCHAR(20) NOT NULL,
	model		VARCHAR(20) NOT NULL,
	year		INT NOT NULL,
	price		DOUBLE NOT NULL,
	PRIMARY KEY(listing_id)
);

CREATE TABLE cars(
	stock_id 	INT NOT NULL AUTO_INCREMENT,
	listing_id 	INT NOT NULL,
	vin			VARCHAR(17) NOT NULL,
	color		VARCHAR(20) NOT NULL,
	PRIMARY KEY(stock_id),
	FOREIGN KEY(listing_id) REFERENCES listings (listing_id),
	UNIQUE(vin)
);
);

CREATE TABLE transactions(
	transaction_id 	INT NOT NULL AUTO_INCREMENT,
	customer_id	INT NOT NULL,
	stock_id	INT NOT NULL,
	transactionDate DATE NOT NULL,
	PRIMARY KEY(transaction_id),
	FOREIGN KEY(customer_id) REFERENCES customers (customer_id),
	FOREIGN KEY(stock_id) REFERENCES cars (stock_id)
);


CREATE TABLE appointments(
	appointment_id 	INT NOT NULL AUTO_INCREMENT,
	listing_id	INT NOT NULL,
	customer_id	INT NOT NULL,
	employee_id	INT NOT NULL,
	PRIMARY KEY(appointment_id),
	FOREIGN KEY(listing_id) REFERENCES listings (listing_id),
	FOREIGN KEY(customer_id) REFERENCES customers (customer_id),
	FOREIGN KEY(employee_id) REFERENCES employees (employee_id)
);

