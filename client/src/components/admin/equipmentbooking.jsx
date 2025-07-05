import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, ListGroup, Container, Row, Col, Spinner } from 'react-bootstrap';

export default function EquipmentBooking() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8500/admin/equipmentbooking')
      .then((res) => {
        setData(res.data);
        console.log(res.data); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };
  const handleAcceptBooking = (bookingId) => {
    axios.put(`http://localhost:8500/admin/statusbooking`, { status: "Accepted" }, { headers: { id: bookingId } })
      .then((res) => {
        alert('Booking request accepted!');
        setData(prevData => prevData.filter(item => item.bookingId !== bookingId)); 
      })
      .catch(error => {
        console.error('Error accepting booking:', error);
        alert('Failed to accept the booking.');
      });
  };

  const handleCancelBooking = (bookingId) => {
    axios.put(`http://localhost:8500/admin/statusbooking/`, { status: "Cancelled" }, { headers: { id: bookingId } })
      .then((res) => {
        alert('Booking request canceled!');
        setData(prevData => prevData.filter(item => item.bookingId !== bookingId)); 
      })
      .catch(error => {
        console.error('Error canceling booking:', error);
        alert('Failed to cancel the booking.');
      });
  };

  const handleReturnBooking = (bookingId) => {
    axios.put(`http://localhost:8500/admin/statusbooking`, { status: "Returned" }, { headers: { id: bookingId } })
      .then((res) => {
        alert('Booking status updated to Returned!');
        setData(prevData => prevData.map(item => 
          item.bookingId === bookingId ? { ...item, status: 'Returned' } : item
        )); 
      })
      .catch(error => {
        console.error('Error returning booking:', error);
        alert('Failed to update booking status to Returned.');
      });
  };

  return (
    <Container>
      <h2 className="my-4">Equipment Booking Information</h2>
      {data === null ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {data.filter(item => item.status !== "Returned").map((item, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Booking ID: {item.bookingId}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Client Name:</strong> {item.userId.username}</ListGroup.Item>
                    <ListGroup.Item><strong>Equipment Name:</strong> {item.equipmentId.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Booking Dates:</strong> {formatDate(item.startDate)} to {formatDate(item.endDate)}</ListGroup.Item>
                    <ListGroup.Item><strong>Total Amount:</strong> {item.totalAmount}</ListGroup.Item>
                    <ListGroup.Item><strong>Status:</strong> {item.status}</ListGroup.Item>
                  </ListGroup>
                  {item.status === "Booked" && (
                    <Button 
                      variant="success" 
                      className="mt-3 me-2" 
                      onClick={() => handleAcceptBooking(item._id)}
                    >
                      Accept Request
                    </Button>
                  )}
                  {item.status === "Accepted" || item.status ==="Payment Successful" && (
                    <Button 
                      variant="info" 
                      className="mt-3 me-2" 
                      onClick={() => handleReturnBooking(item._id)}
                    >
                      Mark as Returned
                    </Button>
                  )}
                  <Button 
                    variant="danger" 
                    className="mt-3" 
                    onClick={() => handleCancelBooking(item._id)}
                  >
                    Cancel Request
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
