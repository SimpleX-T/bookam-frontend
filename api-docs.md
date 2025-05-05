# Bus Service API Documentation

## Overview

This documentation provides details for a Bus Service API that includes account management, bus operations, and route management.

## Authentication

The API uses JWT Bearer token authentication.

## Endpoints

### Account Management

#### Register a new account

- **URL**: `/api/account/register`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "username": "string", // required
    "email": "string", // required, email format
    "password": "string" // required, min length: 8, uppercase, symbol, numeric
  }
  ```

#### Login

- **URL**: `/api/account/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "username": "string", // required
    "password": "string" // required
  }
  ```

#### Confirm Account

- **URL**: `/api/account/confirm`
- **Method**: GET
- **Query Parameters**:
  - UserId: string
  - Token: string

#### Test Email

- **URL**: `/api/account/test-email`
- **Method**: GET

### Bus Operations

#### Get Bus by ID

- **URL**: `/api/bus/{id}`
- **Method**: GET
- **Path Parameters**:
  - id: integer

#### Create Bus

- **URL**: `/api/bus/create`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "busNumber": "string",
    "capacity": integer,
    "routeId": integer,
    "departureTime": "datetime",
    "arrivalTime": "datetime"
  }
  ```

#### Get All Buses

- **URL**: `/api/bus/getAll`
- **Method**: GET
- **Response**: Array of Bus objects

#### Update Bus

- **URL**: `/api/bus/update/{id}`
- **Method**: PUT
- **Path Parameters**:
  - id: integer
- **Request Body**:
  ```json
  {
    "busNumber": "string",
    "capacity": integer,
    "departureTime": "datetime",
    "arrivalTime": "datetime",
    "routeId": integer
  }
  ```

#### Delete Bus

- **URL**: `/api/bus/delete/{id}`
- **Method**: DELETE
- **Path Parameters**:
  - id: integer

### Route Operations

#### Get All Routes

- **URL**: `/api/route/getall`
- **Method**: GET
- **Response**: Array of Route objects

#### Get Route by ID

- **URL**: `/api/route/{id}`
- **Method**: GET
- **Path Parameters**:
  - id: integer

#### Create Route

- **URL**: `/api/route/create`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "origin": "string",
    "destination": "string",
    "price": number,
    "duration": "string",
    "image": "string",
    "description": "string",
    "distance": "string",
    "buses": [
      {
        "busNumber": "string",
        "busModel": "string",
        "capacity": number,
        "departureTime": "datetime",
        "arrivalTime": "datetime"
      }
    ]
  }
  ```

#### Update Route

- **URL**: `/api/route/update/{id}`
- **Method**: PUT
- **Path Parameters**:
  - id: integer
- **Request Body**:
  ```json
  {
    "origin": "string",
    "destination": "string",
    "price": "string"
  }
  ```

#### Delete Route

- **URL**: `/api/route/delete/{id}`
- **Method**: DELETE
- **Path Parameters**:
  - id: integer

#### Search Routes

- **URL**: `/api/route/search`
- **Method**: GET
- **Query Parameters**:
  - Origin: string
  - Destination: string

### User Operations

#### Delete User

- **URL**: `/api/user/delete`
- **Method**: DELETE

## Data Models

### Bus

```json
{
  "busId": integer,
  "routeId": integer,
  "busNumber": "string",
  "capacity": integer,
  "departureTime": "datetime",
  "arrivalTime": "datetime"
}
```

### Route

```json
{
  "routeId": number,
  "origin": "string",
  "destination": "string",
  "price": number,
  "duration": "string",
  "image": "string",
  "description": "string",
  "distance": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "buses": [
    {
      "busId": number,
      "routeId": number,
      "busNumber": "string",
      "busModel": "string",
      "capacity": number,
      "seatsRemaining": number,
      "bookedSeats": array,
      "availableSeats": array,
      "departureTime": "datetime",
      "arrivalTime": "datetime"
    }
  ]
}
```
