Backend CRUD API with MongoDB
Project Description

This project is a backend REST API developed using Node.js, Express, and MongoDB.
The API implements full CRUD operations (Create, Read, Update, Delete) and was tested using Postman with Body → raw → JSON.

The project demonstrates how to work with:

MongoDB collections

Mongoose schemas

ObjectId relationships

RESTful routes

Postman API testing

Technologies Used

Node.js

Express.js

MongoDB

Mongoose

Postman

Project Structure
project/
│
├── models/
│   ├── Product.js
│   └── Review.js
│
├── routes/
│   ├── productRoutes.js
│   └── reviewRoutes.js
│
├── controllers/
│   ├── productController.js
│   └── reviewController.js
│
├── server.js
├── package.json
└── README.md

Database Schema
Review Schema
{
  productId: ObjectId (reference to Product),
  text: String,
  rating: Number
}


productId is a MongoDB ObjectId

It creates a relationship between Product and Review

API Endpoints
Products

POST /products – create product

GET /products – get all products

GET /products/:id – get product by id

PUT /products/:id – update product

DELETE /products/:id – delete product

Reviews

POST /reviews – create review

GET /reviews – get all reviews

GET /reviews/:id – get review by id

PUT /reviews/:id – update review

DELETE /reviews/:id – delete review

Postman Usage
Request Settings

Method: POST / PUT / DELETE

Headers:

Content-Type: application/json


Body:

raw → JSON

Example Request Body
{
  "productId": "696cc3dd0e9d31a2da9e2838",
  "text": "Good product",
  "rating": 10
}


 Field names must be written exactly as in the schema.
productId must be sent as a string.

Common Errors
 Cannot POST /products/:id

The route does not exist

Wrong HTTP method is used

 All fields required

Missing fields in request body

Wrong field name (example: raiting instead of rating)

 Not found

Incorrect ID

Wrong endpoint

Resource does not exist in database

How to Run the Project

Install dependencies:

npm install


Start MongoDB

Run the server:

node server.js


Test API using Postman:

http://localhost:3000

Conclusion

This project helped me understand how backend APIs work with databases, how to connect collections using ObjectId, and how to properly test CRUD operations using Postman.
