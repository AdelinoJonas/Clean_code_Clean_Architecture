drop schema my_uber_db;
create schema my_uber_db;

create table my_uber_db.passenger (
  passenger_id uuid primary key,
  name text,
  email text,
  document text,
);