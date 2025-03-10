import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';

export default function ViewBooking() {
  const [bookings, setBookings] = useState([]); // To store bookings
  const [userId, setUserId] = useState(''); // State to store the userId filter
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For handling errors

  // Fetch bookings from the server
  const fetchBookings = async () => {
    if (!userId) {
      return; // If userId is empty, do nothing
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await axios.get('http://localhost:8500/admin/equipmentbooking', {
        params: { userId } // Pass userId as query parameter
      });
      setBookings(response.data); // Update the bookings state
      setLoading(false); // Set loading state to false
    } catch (err) {
      setError('Error fetching bookings'); // Handle errors
      setLoading(false); // Set loading state to false
      console.error(err);
    }
  };

  // Effect hook to fetch userId from localStorage and bookings when component mounts
  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId); // Set userId to state from localStorage
    }
  }, []);

  // Effect hook to fetch bookings whenever userId changes
  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  return (
    <Container>
      <h2 className="my-4">View Bookings</h2>

      {/* Input field to filter by userId */}
      <Form.Group controlId="userIdInput" className="mb-3">
        {/* <Form.Label>Enter User ID</Form.Label>
        <Form.Control
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        /> */}
      </Form.Group>

      {/* If the component is loading, show a loading spinner */}
      {loading && <Spinner animation="border" variant="primary" />}

      {/* If there's an error, show an error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Display bookings */}
      <Row>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Booking ID: {booking.bookingId}</Card.Title>
                  <Card.Text>
                    <strong>Client Name: </strong> {booking.userId.username}
                  </Card.Text>
                  <Card.Text>
                    <strong>Equipment: </strong> {booking.equipmentId.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status: </strong> {booking.status}
                  </Card.Text>
                  <Card.Text>
                    <strong>Booking Dates: </strong> {booking.startDate} to {booking.endDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No bookings found for this user.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
