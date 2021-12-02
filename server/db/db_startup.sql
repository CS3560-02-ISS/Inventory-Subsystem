CREATE DATABASE iss;
USE iss;

CREATE USER 'issTeam'@'localhost' IDENTIFIED BY 'cs3560';
GRANT ALL PRIVILEGES ON *.* TO 'issTeam'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE customers( 
	customer_id 		INT NOT NULL AUTO_INCREMENT,
	customerName 		VARCHAR(30) NOT NULL,
	customerAddress 	VARCHAR(50) NOT NULL,
	customerUsername	VARCHAR(30) NOT NULL,
	customerPassword 	TEXT,
	PRIMARY KEY(customer_id),
	UNIQUE(customerUsername)
);

CREATE TABLE cards (
	card_number INT NOT NULL,
	civ 		INT NOT NULL,
	expiration 	VARCHAR(4) NOT NULL,
	customer_id INT NOT NULL,
	PRIMARY KEY (card_number),
	FOREIGN KEY(customer_id) REFERENCES customers (customer_id),
	UNIQUE(card_number)
)
	

CREATE TABLE employees(
	employee_id 	INT NOT NULL AUTO_INCREMENT,
	employeeName	VARCHAR(20) NOT NULL,
	employeeUsername VARCHAR(20) NOT NULL,
	employeeAddress  VARCHAR(50) NOT NULL,
	employeePassword TEXT,
	PRIMARY KEY (employee_id),
	UNIQUE(employeeUsername)
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
	sold 		BOOL NOT NULL,
	PRIMARY KEY(stock_id),
	FOREIGN KEY(listing_id) REFERENCES listings (listing_id),
	UNIQUE(vin)
);

CREATE TABLE transactions(
	transaction_id 	INT NOT NULL AUTO_INCREMENT,
	customer_id	INT NOT NULL,
	employee_id	INT,
	stock_id	INT NOT NULL,
	transactionDate TEXT NOT NULL,
	PRIMARY KEY(transaction_id),
	FOREIGN KEY(customer_id) REFERENCES customers (customer_id),
	FOREIGN KEY(stock_id) REFERENCES cars (stock_id),
	FOREIGN KEY(employee_id) REFERENCES employees (employee_id)
);


CREATE TABLE appointments(
	appointment_id 	INT NOT NULL AUTO_INCREMENT,
	listing_id	INT NOT NULL,
	customer_id	INT NOT NULL,
	employee_id	INT NOT NULL,
	date 		TEXT NOT NULL,
	PRIMARY KEY(appointment_id),
	FOREIGN KEY(listing_id) REFERENCES listings (listing_id),
	FOREIGN KEY(customer_id) REFERENCES customers (customer_id),
	FOREIGN KEY(employee_id) REFERENCES employees (employee_id)
);

