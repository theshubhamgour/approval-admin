-- Create the database
CREATE DATABASE IF NOT EXISTS request_management;

-- Use the database
USE request_management;

-- table for requests approval form
CREATE TABLE IF NOT EXISTS requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer VARCHAR(255) NOT NULL,
    environment VARCHAR(255) NOT NULL,
    remarks TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the user_authentication table
CREATE TABLE IF NOT EXISTS user_authentication (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create a trigger to convert full_name and username to lowercase before insertion
DELIMITER $$

CREATE TRIGGER before_insert_user_authentication
BEFORE INSERT ON user_authentication
FOR EACH ROW
BEGIN
    SET NEW.full_name = LOWER(NEW.full_name);
    SET NEW.username = LOWER(NEW.username);
END$$

DELIMITER ;

-- Insert the admin user
INSERT INTO user_authentication (full_name, username, password)
VALUES ('Admin', 'admin', 'admin123#');


-- This option modifies the authentication method for the MySQL user to use the older mysql_native_password method, which is supported by the mysql Node.js library.

-- Open MySQL Command Line: Connect to your MySQL server using the MySQL command-line client or a tool like MySQL Workbench.

-- Run the Following Commands: Replace 'your_username' with the username you're using to connect to MySQL.
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Admin123#
FLUSH PRIVILEGES;