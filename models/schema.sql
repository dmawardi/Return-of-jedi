DROP DATABASE IF EXISTS facecheckin;
CREATE DATABASE facecheckin;

USE facecheckin;

CREATE TABLE employer
(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website TEXT,
    logo TEXT,
    password VARCHAR(20),
	PRIMARY KEY (id)
);

CREATE TABLE employee
( 
    id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    department VARCHAR(40) NOT NULL,
    position VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile INT(10) ZEROFILL NOT NULL,
    address TEXT,    
    DOB DATE,
    image1 TEXT NOT NULL,
    image2 TEXT NOT NULL,
    image3 TEXT NOT NULL, 
	PRIMARY KEY (id)
)

CREATE TABLE timesheet
(
    id INT NOT NULL AUTO_INCREMENT,
    emp_id INT,
    emp_name VARCHAR(255),
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    location VARCHAR(255),
    PRIMARY KEY (id)
)
