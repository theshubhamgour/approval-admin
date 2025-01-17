# User Authentication System

A simple user authentication system built with Node.js, Express.js, and MySQL.

## Features

* User registration with username, password, and full name
* User login with username and password
* Password storage using plain text (not recommended for production use)
* MySQL database for storing user data

## Requirements

* Node.js (version 14 or higher)
* Express.js (version 4 or higher)
* MySQL (version 8 or higher)
* npm (version 6 or higher)

## Installation

1. Clone the repository using `git clone https://github.com/your-username/your-repo-name.git`
2. Install dependencies using `npm install`
3. Create a MySQL database and update the `server.js` file with your database credentials
4. Start the server using `node server.js`

## Usage

1. Open a web browser and navigate to `http://localhost:3000`
2. Click on the "Sign Up" link to register a new user
3. Fill out the registration form and submit it
4. Click on the "Login" link to log in with your newly created user credentials

## API Endpoints

* `/login`: Handles user login requests
* `/signup`: Handles user registration requests

## Database Schema

The database schema consists of a single table named `user_authentication` with the following columns:

* `id`: Unique identifier for each user
* `full_name`: Full name of the user
* `username`: Username chosen by the user
* `password`: Password chosen by the user (stored in plain text)

## Security Considerations

* This project stores passwords in plain text, which is not recommended for production use. Consider using a password hashing library like bcrypt or scrypt to securely store passwords.
* This project uses a simple authentication system and does not implement any additional security measures like CSRF protection or rate limiting.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## Acknowledgments

This project was built using the following resources:

* Node.js: https://nodejs.org/
* Express.js: https://expressjs.com/
* MySQL: https://www.mysql.com/
* npm: https://www.npmjs.com/
