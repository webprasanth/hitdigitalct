require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../ui')));

// Database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Routes
app.get('/flights', (req, res) => {
    const { departure_location, arrival_location, departure_date, num_passengers } = req.query;
    const query = `
        SELECT * FROM flights 
        WHERE departure_location = ? 
        AND arrival_location = ? 
        AND departure_date >= ? 
        AND available_seats >= ?;
    `;
    connection.query(query, [departure_location, arrival_location, departure_date, num_passengers], (error, results) => {
        if (error) {
            console.error("Error searching for flights:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.post('/bookings', (req, res) => {
    const { flight_id, passengers } = req.body;
    connection.query('SELECT available_seats FROM flights WHERE id = ?', [flight_id], (error, results) => {
        if (error) {
            console.error("Error checking available seats:", error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const availableSeats = results[0].available_seats;
        if (availableSeats < passengers.length) {
            res.status(400).json({ error: 'Not enough available seats' });
            return;
        }
        const bookingValues = passengers.map(passenger => [flight_id, passenger.name, passenger.email]);
        connection.query('INSERT INTO bookings (flight_id, passenger_name, passenger_email) VALUES ?', [bookingValues], (error, results) => {
            if (error) {
                console.error("Error booking flight:", error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const updatedSeats = availableSeats - passengers.length;
                connection.query('UPDATE flights SET available_seats = ? WHERE id = ?', [updatedSeats, flight_id], (error, results) => {
                    if (error) {
                        console.error("Error updating available seats:", error);
                    }
                });
                const confirmationNumber = generateConfirmationNumber();
                res.json({
                    booking_id: results.insertId,
                    confirmation_number: confirmationNumber
                });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function generateConfirmationNumber() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
