CREATE DATABASE countrydb;

USE countrydb;

CREATE TABLE clients_registered(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(16) NOT NULL,
    country VARCHAR(16) NOT NULL 
);