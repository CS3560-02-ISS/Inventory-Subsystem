# Inventory Sybsytem API Reference
This api allows users to manage an inventory system for vehicles and purchases.

## Cars
### Get All Cars
This endpoint retrieves all cars.

### HTTP Request
`GET http://example.com/cars`

---

### Get a Specific Car
This endpoint retrieves a specific car.

### HTTP Request
`GET http://example.com/cars/<stock_id>`

### URL Parameters

| Parameter | Description                   |
|-----------|-------------------------------|
| stock_id  | The id of the car to retrieve |

---

### Create a Car
This endpoint creates a new car.

### HTTP Request
`POST http://example.com/cars`

### Payload

