# Inventory Sybsytem API Reference

This api allows users to manage an inventory system for vehicles and purchases.

# Cars

## Get All Cars

This endpoint retrieves all cars.

#### HTTP Request

```
GET http://example.com/cars
```


---

## Get a Specific Car

This endpoint retrieves a specific car.

#### HTTP Request

```
GET http://example.com/cars/<stock_id>
```


#### URL Parameters

| Parameter | Description                   |
|-----------|-------------------------------|
| stock_id  | The id of the car to retrieve |

---

## Create a Car

This endpoint creates a new car.

#### HTTP Request

```
POST http://example.com/cars
```


#### Payload

| Parameter  | Description                               |
|------------|-------------------------------------------|
| listing_id | The id of the listing this car belongs to |
| color      | The color of the car                      |
| vin        | The vin of the car                        |

---

## Delete a Specific Car

This endpoint retrieves a specific car.

#### HTTP Request

```
DELETE http://example.com/cars/<stock_id>
```


#### URL Parameters

| Parameter | Description                   |
|-----------|-------------------------------|
| stock_id  | The id of the car to retrieve |

# Listings

## Get All Listings

This endpoint retrieves all listings.

#### HTTP Request

```
GET http://example.com/listings
```

#### URL Parameters

| Parameter | Description              |
|-----------|--------------------------|
| make      | The make of the listing  |
| model     | The color of the listing |
| year      | The vin of the listing   |

---

## Get a Specific Listing

This endpoint retrieves a specific listing.

#### HTTP Request

```
GET http://example.com/listings/<listing_id>
```


#### URL Parameters

| Paramter   | Description                       |
|------------|-----------------------------------|
| listing_id | The id of the listing to retrieve |

---

## Get Current Stock of Listing

This endpoint retrieves all cars under a current listing.

#### HTTP Request

```
GET http://example.com/listings/<listing_id>/cars
```


#### URL Parameters

| Paramter   | Description                       |
|------------|-----------------------------------|
| listing_id | The id of the listing to retrieve |

---

## Update a Listing

This endpoint updates a specific listing.

#### HTTP Request

```
PUT http://example.com/listings/<listing_id>
```


#### URL Parameters

| Parameter | Description              |
|-----------|--------------------------|
| listing_id| The ID of the listing to retrieve  |

#### Request Body

| Key   | Value                    |
|-------|--------------------------|
| make  | The make of the listing  |
| model | The color of the listing |
| year  | The vin of the listing   |
| price | The price of the listing |

- - -

## Create a Listing

This endpoint creates a specific listing.

#### HTTP Request

```
POST http://example.com/listings
```


#### Request Body

| Key   | Value                    |
|-------|--------------------------|
| make  | The make of the listing  |
| model | The color of the listing |
| year  | The vin of the listing   |
| price | The price of the listing |
