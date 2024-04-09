CREATE DATABASE IF NOT EXISTS flight_booking;

USE flight_booking;

CREATE TABLE IF NOT EXISTS flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    departure_location VARCHAR(255),
    arrival_location VARCHAR(255),
    departure_date DATETIME,
    available_seats INT
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_id INT,
    passenger_name VARCHAR(255),
    passenger_email VARCHAR(255),
    FOREIGN KEY (flight_id) REFERENCES flights(id)
);

-- Insertion for Sample Data


INSERT INTO flights (id, departure_location, arrival_location, departure_date, available_seats)
VALUES
    (1, 'Mumbai', 'Delhi', '2024-04-10 08:00:00', 150),
    (2, 'Delhi', 'Mumbai', '2024-04-10 12:00:00', 120),
    (3, 'Bangalore', 'Chennai', '2024-04-11 10:00:00', 100),
    (4, 'New York', 'London', '2024-04-10 09:00:00', 200),
    (5, 'London', 'New York', '2024-04-10 13:00:00', 180),
    (6, 'Paris', 'Tokyo', '2024-04-11 11:00:00', 150);

