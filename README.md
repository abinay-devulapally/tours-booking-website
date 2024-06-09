# Tours Booking Website

Tours Booking Website is a comprehensive full stack web application designed to facilitate tour bookings. This project leverages the power of modern web technologies to provide a seamless user experience for both end-users and administrators.

## Technology Stack

- **Backend:** Built with Node.js and Express, providing a robust and scalable server-side framework.
- **Database:** Utilizes MongoDB for data storage, ensuring flexible and efficient data management.
- **Frontend:** HTML Pug templates are used for rendering dynamic web pages, offering a clean and maintainable front-end structure.
- **Authentication:** Implements JWT (JSON Web Tokens) for secure user authentication and session management.
- **Payment Processing:** Integrated with Stripe to handle secure and efficient payment transactions.

## Project Structure

- **controllers/**: Contains the logic for handling requests and responses, including functionalities for managing reviews and user signups.
- **dev-data/**: Holds the development data used for testing and populating the database during the development phase.
- **models/**: Defines the data schemas and structures for MongoDB collections.
- **public/**: Includes all the static files such as CSS, JavaScript, and images used in the frontend.
- **routers/**: Manages the routing for different parts of the application, directing incoming requests to the appropriate controllers.
- **utils/**: Provides utility functions and middlewares to support various functionalities across the application.
- **views/**: Contains Pug templates for rendering HTML pages dynamically based on user interactions and data.

## Key Features

- **User Authentication:** Secure login and registration system using JWT.
- **Tour Management:** Users can browse, book, and manage tours effortlessly.
- **Review System:** Users can edit their reviews.
- **Payment Integration:** Secure and reliable payment processing through Stripe.
- **Admin Capabilities:** Administrators have access to manage users and tours, ensuring smooth operation of the platform.

## Getting Started

To get started with the project, follow the instructions provided in the Installation and Setting Up Your Environment sections of this README.

## Requirements

To run this application, you will need the following:

- Node.js installed on your local machine
- MongoDB Atlas account or a local installation of MongoDB
- Stripe account for payment processing

## Installation

1. Clone the repository to your local machine using `git clone`.
   ```bash
   git clone https://github.com/abinay-devulapally/tours-booking-website.git
   ```
2. Navigate to the root directory of the project in your terminal.
   ```bash
   cd tours-booking-website
   ```
3. Install the dependencies by running:
   ```bash
   npm install
   ```

## Setting Up Your Environment

Create a `config.env` file in the root directory of the project and add the following variables:

```env
# Environment Configuration
NODE_ENV=development
# NODE_ENV=production
PORT=8000

# Database Configuration
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE=mongodb+srv://your_database_user:<PASSWORD>@your_cluster.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=your_app_name
DATABASE_LOCAL=mongodb://localhost:27017/your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_jwt_expires_in
JWT_COOKIE_EXPIRES_IN=your_jwt_cookie_expires_in

# Email Configuration
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port

# Mapbox Configuration
MAPBOX_ACCESS_TOKEN=your_mapbox_access_token

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Notes

- Replace `your_database_user`, `your_database_password`, `your_database_name`, `your_app_name`, `your_jwt_secret`, `your_jwt_expires_in`, `your_jwt_cookie_expires_in`, `your_email_username`, `your_email_password`, `your_email_host`, `your_email_port`, `your_mapbox_access_token`, and `your_stripe_secret_key` with your actual configuration values.
- Ensure the file is saved correctly and is not committed to version control to keep your secrets secure.

## Usage

To start the application, run the following command in your terminal:

```bash
npm start
```

This will start the server and make the application available at `http://localhost:8000`.

## Additional Information

- **Production URL:** [https://bookmytours.onrender.com/](https://bookmytours.onrender.com/)
- **API Documentation:** Detailed API documentation can be accessed [here](api-documentation/README.md).

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. All contributions are welcome!

## License

This project is not licensed.

## Repository

You can find the repository [here](https://github.com/abinay-devulapally/tours-booking-website).

```
This `README.md` provides a detailed guide for setting up and running your project, including all necessary configuration steps and additional information about the production and API documentation URLs.
```
