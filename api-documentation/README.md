# Postman API Documentation: [click here](https://documenter.getpostman.com/view/15814592/2sA3XLDiak)

# BookMyTours API Documentation

BookMyTours is a tour booking website with endpoints for Tours, Users, Authentication, and Reviews.

## Authorization

All endpoints require a Bearer Token for authorization.

## Tours

### Get All Tours

**Endpoint:** `GET {{URL}}api/v1/tours/`

**Description:** Retrieve a list of all tours.

**Authorization:** Bearer Token

**Response:**

- **Status:** 200
- **Content-Type:** application/json
- **Response Body:**
  ```json
  {
    "status": "string",
    "results": "number",
    "data": {
      "doc": [
        {
          "startLocation": "object",
          "rating": "number",
          "ratingsAverage": "number",
          "ratingsQuantity": "number",
          "images": ["array"],
          "startDates": ["array"],
          "guides": [
            {
              "role": "string",
              "_id": "string",
              "name": "string",
              "email": "string"
            }
          ],
          "_id": "string",
          "name": "string",
          "duration": "number",
          "maxGroupSize": "number",
          "difficulty": "string",
          "price": "number",
          "summary": "string",
          "description": "string",
          "imageCover": "string",
          "locations": [
            {
              "type": "string",
              "coordinates": ["array"],
              "_id": "string",
              "description": "string",
              "day": "number"
            }
          ],
          "durationWeeks": "number",
          "id": "string"
        }
      ]
    }
  }
  ```

### Get Top 5 Cheap Tours

**Endpoint:** `GET {{URL}}api/v1/tours/top-5-cheap`

**Description:** Retrieve the top 5 cheap tours.

**Authorization:** Bearer Token

**Query Params:**

- **price[gte]**: 900
- **difficulty**: easy
- **limit**: 5
- **page**: 2
- **fields**: name,price,ratingsAverage,summary,difficulty
- **sort**: -ratingsAverage

**Response:** JSON schema as per API implementation.

### Create New Tour

**Endpoint:** `POST {{URL}}api/v1/tours`

**Description:** Create a new tour.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "name": "string",
  "rating": 0,
  "ratingsAverage": 0,
  "ratingsQuantity": 0,
  "duration": 0,
  "maxGroupSize": 0,
  "difficulty": "string",
  "price": 0,
  "summary": "string",
  "imageCover": "string",
  "durationWeeks": 0,
  "guides": ["string"]
}
```

**Response:** JSON schema representing the newly created tour.

### Get Tour

**Endpoint:** `GET {{URL}}api/v1/tours/5c88fa8cf4afda39709c2955`

**Description:** Retrieve information about a specific tour.

**Authorization:** Bearer Token

**Response:** JSON schema as per API implementation.

### Update Tour

**Endpoint:** `PATCH {{URL}}api/v1/tours/5c88fa8cf4afda39709c2955`

**Description:** Update the price of a specific tour.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "price": 0
}
```

**Response:**

```json
{
  "status": "string",
  "data": {
    "tour": {
      "id": "string",
      "name": "string",
      "price": "number"
    }
  }
}
```

### Delete Tour

**Endpoint:** `DELETE {{URL}}api/v1/tours/663cc8e4f7d3fe0ae09ff503`

**Description:** Delete a specific tour.

**Authorization:** Bearer Token

**Response:** JSON schema representing the deleted tour.

### Get Tour Stats

**Endpoint:** `GET {{URL}}api/v1/tours/tour-stats`

**Description:** Retrieve statistics for tours.

**Authorization:** Bearer Token

**Response:**

```json
{
  "tourStats": {
    "numTours": 100,
    "numRatings": 500,
    "avgRating": 4.5
  }
}
```

### Get Monthly Plan for Tours

**Endpoint:** `GET {{URL}}api/v1/tours/monthly-plan/2021`

**Description:** Retrieve the monthly plan for tours for the year 2021.

**Authorization:** Bearer Token

**Response:**

```json
{
  "month": "string",
  "numTours": "number",
  "numRatings": "number",
  "avgRating": "number"
}
```

## Users

### Get All Users

**Endpoint:** `GET {{URL}}api/v1/users`

**Description:** Retrieve a list of users.

**Authorization:** Bearer Token

**Response:**

```json
[
  {
    "id": "123",
    "name": "John Doe",
    "email": "johndoe@example.com"
  },
  {
    "id": "456",
    "name": "Jane Smith",
    "email": "janesmith@example.com"
  }
]
```

### Create New User

**Endpoint:** `POST {{URL}}api/v1/users`

**Description:** Create a new user.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "role": "guide",
  "name": "guide",
  "email": "guide@gmail.com",
  "password": "pass@123",
  "passwordConfirm": "pass@123"
}
```

**Response:**

```json
{
  "userId": "string",
  "message": "string"
}
```

### Get User

**Endpoint:** `GET {{URL}}api/v1/users/663cc28094986e0ffcecdcfe`

**Description:** Retrieve details of a specific user.

**Authorization:** Bearer Token

**Response:**

```json
{
  "user_id": "string",
  "username": "string",
  "email": "string",
  "created_at": "string"
}
```

### Get Me

**Endpoint:** `GET {{URL}}api/v1/users/me`

**Description:** Retrieve details of the current user.

**Authorization:** Bearer Token

**Response:**

```json
{
  "userId": "string",
  "username": "string",
  "email": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Update User

**Endpoint:** `PATCH {{URL}}api/v1/users/5c8a1d5b0190b214360dc057`

**Description:** Update a specific user's information.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "name": "Abinay Kumar Devulapally"
}
```

**Response:** JSON schema representing the updated user information.

### Delete User

**Endpoint:** `DELETE {{URL}}api/v1/users/id`

**Description:** Delete a specific user by their ID.

**Authorization:** Bearer Token

**Response:**

```json
{
  "message": "User deleted successfully",
  "status": true
}
```

### Update User Profile

**Endpoint:** `PATCH {{URL}}api/v1/users/updateMe`

**Description:** Update user information.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "name": "newuser1",
  "email": "user1@gmail.com"
}
```

**Response:**

```json
{
  "status": "string",
  "data": {
    "user": {
      "name": "string",
      "email": "string"
    }
  }
}
```

### Delete User Profile

**Endpoint:** `DELETE {{URL}}api/v1/users/deleteMe`

**Description:** Delete the user's own account.

**Authorization:** Bearer Token

**Response:**

```json
{
  "message": "string"
}
```

## Authentication

### Sign Up

**Endpoint:** `POST {{URL}}api/v1/users/signup`

**Description:** Create a new user account.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "name": "test1",
  "email": "test1@gmail.com",
  "password": "{{password}}",
  "passwordConfirm": "{{password}}"
}
```

**Response:**

```json
{
  "userId": "string",
  "name": "string",
  "email": "string"
}
```

### Log In

**Endpoint:** `POST {{URL}}api/v1/users/login`

**Description:** Log in a user.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "email": "ayls@example.com",
  "password": "{{password}}"
}
```

**Response:** JSON schema as per API implementation.

### Forgot Password

**Endpoint:** `POST {{URL}}api/v1/users/forgotPassword`

**Description:** Initiate the process of resetting a user's password.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "email": "test@gmail.com"
}
```

**Response:**

```json
{
  "message": "string"
}
```

### Reset Password

**Endpoint:** `PATCH {{URL}}api/v1/users/resetPassword/be9ff4f1f67654

b5d6f6b89dd8`

**Description:** Reset the user's password using a reset token.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "password": "{{password}}",
  "passwordConfirm": "{{password}}"
}
```

**Response:**

```json
{
  "token": "string"
}
```

### Update Password

**Endpoint:** `PATCH {{URL}}api/v1/users/updateMyPassword`

**Description:** Update the user's current password.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "passwordCurrent": "{{currentPassword}}",
  "password": "{{newPassword}}",
  "passwordConfirm": "{{newPassword}}"
}
```

**Response:** JSON schema as per API implementation.

## Reviews

### Get All Reviews

**Endpoint:** `GET {{URL}}api/v1/reviews`

**Description:** Retrieve all reviews.

**Authorization:** Bearer Token

**Response:** JSON schema representing all reviews.

### Create New Review

**Endpoint:** `POST {{URL}}api/v1/reviews`

**Description:** Create a new review.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "review": "Beautiful tour",
  "rating": 4.5,
  "tour": "64c1ba4f0ccecf3f10ed5bb8"
}
```

**Response:**

```json
{
  "id": "string",
  "review": "string",
  "rating": 4.5,
  "tour": "string",
  "createdAt": "string"
}
```

### Get Review

**Endpoint:** `GET {{URL}}api/v1/reviews/66f126cb4ce42a4b6e64cb92`

**Description:** Retrieve a specific review by ID.

**Authorization:** Bearer Token

**Response:** JSON schema representing the review.

### Update Review

**Endpoint:** `PATCH {{URL}}api/v1/reviews/5c88fa8cf4afda39709c2955`

**Description:** Update a specific review by ID.

**Authorization:** Bearer Token

**Request Body:**

```json
{
  "review": "Not bad"
}
```

**Response:** JSON schema representing the updated review.

### Delete Review

**Endpoint:** `DELETE {{URL}}api/v1/reviews/5c88fa8cf4afda39709c2955`

**Description:** Delete a specific review by ID.

**Authorization:** Bearer Token

**Response:** JSON schema representing the deleted review.

## Testing and Feedback

Use Postman to test these endpoints.
