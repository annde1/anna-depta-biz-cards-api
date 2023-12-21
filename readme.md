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
- PUT /api/v1/users/:id
  Update user information.
  Requires account owner access.

- POST /api/v1/users/
  Create a new user.
  Requires registration data.

- POST /api/v1/users/login
  User login.
  Requires email and password.

- DELETE /api/v1/users/:id
  Delete a user.
  Requires admin or account owner access.

- PATCH /api/v1/users/:id
  Change business status of a user.
  Requires account owner access.

### Cards

- GET /api/v1/cards/
  Get all business cards.

- GET /api/v1/cards/my-cards
  Get business cards owned by the authenticated user.

- GET /api/v1/cards/:id
  Get business card details by ID.

- POST /api/v1/cards/
  Create a new business card.
  Requires business user access and card data.

- PATCH /api/v1/cards/:id
  Like a business card.
  Requires business user access.

- PUT /api/v1/cards/:id
  Edit a business card.
  Requires card owner access and card data.

- DELETE /api/v1/cards/:id
  Delete a business card.
  Requires admin, card owner, or business user access.
