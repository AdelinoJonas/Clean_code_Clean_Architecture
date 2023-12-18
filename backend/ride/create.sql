drop schema my_uber_db;
create schema my_uber_db;

CREATE TABLE passenger (
  passenger_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  email TEXT,
  document TEXT
);

CREATE TABLE driver (
  driver_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  email TEXT,
  document TEXT,
  car_plate TEXT
);