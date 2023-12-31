# BizCards API

## Overview

The BizCards API is a RESTful web service for managing business cards and user information. It provides endpoints for creating, updating, and retrieving business cards, as well as managing user accounts.

## Technologies Used

- Node.js: JavaScript runtime
- Express.js: Web application framework
- MongoDB: NoSQL database
- Mongoose: MongoDB object modeling for Node.js
- JWT (JSON Web Tokens): Authentication and authorization
- Joi: Object schema description language and validator
- bcrypt: Password hashing
- Morgan: HTTP request logger middleware
- Cors: Cross-origin resource sharing

## Getting Started

To run the BizCards API locally, follow these steps:

1. Clone the Repository:
   git clone https://github.com/your-username/lecture5.git
   cd lecture5
2. Install Dependencies:
   npm install
3. Set Up Environment Variables:
   Create a .env file in the root directory with the following content:
   DB_CONNECTION_STRING=your_mongodb_connection_string
4. Run the Application:
   npm start
   The API will be accessible at http://localhost:8000.

## API Endpoints

### Users

- GET /api/v1/users/:id
  Get user details by ID.
  Requires admin or account owner access.
  **Bearer Token Required:** Yes (User must be previously logged in).

- PUT /api/v1/users/:id
  Update user information.
  Requires account owner access.
  **Bearer Token Required:** Yes (User must be previously logged in).

- POST /api/v1/users/
  Create a new user.
  Requires registration data.
  **Bearer Token Required:** No.

- POST /api/v1/users/login
  User login.
  Requires email and password.
  **Bearer Token Required:** No (Used to obtain a token).

- DELETE /api/v1/users/:id
  Delete a user.
  Requires admin or account owner access.
  **Bearer Token Required:** Yes (User must be previously logged in).

- PATCH /api/v1/users/:id
  Change business status of a user.
  Requires account owner access.
  **Bearer Token Required:** Yes (User must be previously logged in).

### Cards

- GET /api/v1/cards/
  Get all business cards.
  **Bearer Token Required:** No.

- GET /api/v1/cards/my-cards
  Get business cards owned by the authenticated user.
  **Bearer Token Required:** Yes (User must be previously logged in).

- GET /api/v1/cards/:id
  Get business card details by ID.
  **Bearer Token Required:** No.

- POST /api/v1/cards/
  Create a new business card.
  Requires business user access and card data.
  **Bearer Token Required:** Yes (User must be previously logged in).

- PATCH /api/v1/cards/:id
  Like a business card.
  Requires business user access.
  **Bearer Token Required:** Yes (User must be previously logged in).

- PUT /api/v1/cards/:id
  Edit a business card.
  Requires card owner access and card data.
  **Bearer Token Required:** Yes (User must be previously logged in).

- DELETE /api/v1/cards/:id
  Delete a business card.
  Requires admin, card owner, or business user access.
  **Bearer Token Required:** Yes (User must be previously logged in).

## Testing the API:

There are two recommended ways to test the BizCards API:

### Using requests.http File:

You can use the requests.http file located in the routes folder. This file contains pre-configured HTTP requests that can be executed using tools like VS Code REST Client or other API testing tools that support the .http file format.

### Using Postman:

Alternatively, you can use Postman, a popular API testing tool. Follow these steps:

1. Import the Postman collection provided in the project.

- Locate the Postman collection file (if available).
- Import the collection into Postman.

2. Configure Environment Variables (if applicable).

- If the API requires specific environment variables, set them in Postman.

3. Execute API Requests.

- Use the pre-configured requests within the Postman collection to interact with different API endpoints.
- Ensure that the necessary headers, request bodies, and authentication tokens are provided as required.

### Additional Notes

- For endpoints that require a bearer token, ensure that the token is valid. You may obtain a token by performing a user login request (POST /api/v1/users/login).
- Take note of the expected request and response formats as outlined in the API documentation.
