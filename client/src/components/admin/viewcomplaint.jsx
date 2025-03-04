import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function ViewComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8500/admin/viewcomplaints");
        console.log("Complaints Data:", response.data);
        setComplaints(response.data);
      } catch (err) {
        setError('Error fetching complaints');
        console.error(err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <Container className="mt-4">
      <h3>Complaints</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <Row>
        {complaints.length === 0 ? (
          <Col>
            <p className="text-center">No complaints available.</p>
          </Col>
        ) : (
          complaints.map((complaint) => (
            <Col md={6} lg={4} key={complaint._id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Complaint ID: {complaint._id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Freelancer: {complaint.userId.username}</Card.Subtitle>
                  <Card.Text>{complaint.complaint}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
