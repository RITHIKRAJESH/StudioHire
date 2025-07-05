import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Spinner, Alert, Card, Modal, Form } from 'react-bootstrap';

export default function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({
    accountNumber: '',
    cvc: '',
    amount: '',
  });
  const fetchBookings = async () => {
    if (!userId) {
      return; 
    }

    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8500/admin/equipmentbooking');
      const data = response.data;
      const user = data.filter((item) => item.userId._id === userId);
      setBookings(user); 
      setLoading(false); 
    } catch (err) {
      setError('Error fetching bookings');
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);
  const handlePayment = async () => {
    const formErrors = {};
    if (!accountNumber) formErrors.accountNumber = 'Account Number is required';
    if (!cvc) formErrors.cvc = 'CVC is required';
    if (!amount) formErrors.amount = 'Amount is required';
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return; 

    setPaymentLoading(true);
    setPaymentError(null);

    try {
      const paymentResponse = await axios.put(`http://localhost:8500/admin/statusbooking/`, 
        { status: "Payment Successful" }, 
        { headers: { id: selectedBooking._id } }
      );

      if (paymentResponse.status === 200) {
        alert('Payment Successful!');
        setShowPaymentModal(false);
        fetchBookings();
      } else {
        setPaymentError('Payment failed. Please try again.');
      }

      setPaymentLoading(false);
    } catch (err) {
      setPaymentError('Error processing payment. Please try again.');
      setPaymentLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="my-4">View Bookings</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

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
                  {booking.status === 'Accepted' && (
                    <Button
                      variant="success"
                      onClick={() => {
                        setSelectedBooking(booking); 
                        setAmount(booking.totalAmount); 
                        setShowPaymentModal(true);
                        console.log(booking.totalAmount)
                      }}
                    >
                      Pay Now
                    </Button>
                  )}
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

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="accountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                isInvalid={!!errors.accountNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.accountNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="cvc">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                isInvalid={!!errors.cvc}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvc}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={amount}
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handlePayment}
            disabled={paymentLoading}
          >
            {paymentLoading ? 'Processing Payment...' : 'Submit Payment'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
