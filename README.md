Store API
This is a Store API built using Nodejs , Express and Prisma.js. It provides various endpoints to perform operations related to user registration, product management, order creation, and user profile management.

Getting Started

    To run this API locally, follow these steps:

        1. Install Node.js on your machine.

        2. Clone this repository.

        3. Install the dependencies by running the following command in the project directory:

           command : npm install

        4. Start the API server by running the following command

            command :npm run devStart

        5. Set your .env file:

            DATABASE_URL="your Database URL".

            SECERT_KEY="your secert-key".

        6. The API server will start running on port 3000.

Endpoints
The API provides the following endpoints:

1. Sign Up

    Path: `/sign-up`
    Method: `POST`
    Description: Registers a new user.
    Request Body: JSON object containing user registration data.

2. Login

    Path: `/login`
    Method: `POST`
    Description: Logs in a user.
    Request Body: JSON object containing user login credentials.

3. Add Product

    Path: `/products/add`
    Method: `POST`
    Description: Adds a new product (only accessible to admins).
    Request Body: JSON object containing product details.
    Authentication Required: Yes (user must be logged in as an admin).

4. Update Product

    Path: `/products/update`
    Method: `PUT`
    Description: Updates an existing product (only accessible to admins).
    Request Body: JSON object containing updated product details.
    Authentication Required: Yes (user must be logged in as an admin).

5. Delete Product

    Path: `/products/delete`
    Method: `DELETE`
    Description: Deletes a product (only accessible to admins).
    Request Body: JSON object containing the ID of the product to be deleted.
    Authentication Required: Yes (user must be logged in as an admin).

6. Create Order

    Path: `/orders/create`
    Method: `POST`
    Description: Creates a new order.
    Request Body: JSON object containing order details.
    Authentication Required: Yes (user must be logged in).

7. Get Orders

    Path: `/orders`
    Method: `GET`
    Description: Retrieves all orders.
    Authentication Required: Yes (user must be logged in).

8. Update Order Status

    Path: `/orders/update`
    Method:`PUT`
    Description: Updates the status of an order (only accessible to admins).
    Request Body: JSON object containing the ID of the order and the updated status.
    Authentication Required: Yes (user must be logged in as an admin).

9. Get Products

    Path:`/products`
    Method: `GET`
    Description: Retrieves all products.
    Authentication Required: Yes (user must be logged in).

10. Get Specific Product

    Path: `/product`
    Method: `GET`
    Description: Retrieves a specific product by ID.
    Request Body: JSON object containing the NAME of the product.
    Authentication Required: Yes (user must be logged in).

11. Get Specific Order

    Path: `/orders/:id`
    Method: `GET`
    Description: Retrieves a specific order by ID.
    Request Parameters: id - ID of the order.
    Authentication Required: Yes (user must be logged in).

12. Get User Profile

    Path: `/profile`
    Method: `GET`
    Description: Retrieves the user's profile information.
    Authentication Required: Yes (user must be logged in).

13. Update User Profile

    Path: `/profile/update`
    Method: `PUT`
    Description: Updates the user's profile information.
    Request Body: JSON object containing the updated profile data.
    Authentication Required: Yes (user must be logged in).

14. Delete User Account

    Path: `/profile/delete`
    Method: `DELETE`
    Description: Deletes the user's account with orders.
    Authentication Required: Yes (user must be logged in).

15. Cancel an Order

    Path: `/orders/cancel/:id`
    Method: `PUT`
    Description: Cancels an order by ID.
    Request Parameters: id - ID of the order to be canceled.
    Authentication Required: Yes (user must be logged in).

Dependencies
This API utilizes the following dependencies:
    .Express.js
    .Body-parser
    .Prisma
    .Other custom modules for registration, product management, order handling, and user profile management.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request or submit an issue in this repository.