drop schema my_uber_db;
create schema my_uber_db;

create table my_uber_db.passenger (
  passenger_id int not null primary key AUTO_INCREMENT,
  name text,
  email text,
  document text,
);