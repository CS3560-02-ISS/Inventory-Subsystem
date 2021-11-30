USE iss;



INSERT INTO listings (
    make,
    model,
    year,
    price
)
VALUES 
    ("subaru", "wrx", 2008, 8760.0),
    ("subaru", "forester", 2022, 25195.0),
    ("subaru", "crosstrek", 2021, 22245.0);

INSERT INTO cars(
    listing_id,
    vin,
    color,
	sold
)
VALUES
    (1, '6KO8UNDA6YZ87MUMT', 'grey', FALSE),
    (1, 'MHNIY9656PBVHQO3J', 'blue' , FALSE),
    (2, 'JHNN7I2FADXJNTYHH', 'blue', FALSE),
    (2, 'RQZHGH1QFHCLDIALO', 'black', FALSE),
    (2, '3W0QFUAW4CGR9HY5T', 'black', FALSE),
    (2, 'WN99SP5XI1JS28Q8W', 'silver', FALSE),
    (3, '50FB6JAP8PH6J291I', 'orange', FALSE),
    (3, 'NATSGOLX19H4KVRWE', 'white', FALSE),
    (3, 'JUGPOVB3CFQDX658G', 'black', FALSE);


