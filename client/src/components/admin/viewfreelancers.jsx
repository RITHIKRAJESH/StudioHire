import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function Viewfreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [projectDetails, setProjectDetails] = useState({ projectName: '', startDate: '', endDate: '', userId: '' });
  const [booking, setBooking] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [freelancerPhotos, setFreelancerPhotos] = useState([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get('http://localhost:8500/admin/viewuser');
        const book = await axios.get('http://localhost:8500/booking');
        const photosRes = await axios.get('http://localhost:8500/viewphotos');
        
        setPhotos(photosRes.data);
        setBooking(book.data);
        setFreelancers(response.data);
      } catch (err) {
        setError('Error fetching freelancers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  const handleShow = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setProjectDetails({ ...projectDetails, userId: freelancer._id });
    setShow(true);
  };
  
  const handleClose = () => {
    setShow(false);
    setProjectDetails({ projectName: '', startDate: '', endDate: '', userId: '' });
  };

  const handleChange = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const userID = localStorage.getItem('userId');

  const handleViewWorks = (freelancerId) => {
    const filteredPhotos = photos.filter(photo => photo.userId === freelancerId);
    setFreelancerPhotos(filteredPhotos);
    setShowPhotos(true);
  };
  const handleRequest = () => {
    const { startDate, endDate, userId } = projectDetails;
  
    // Convert dates to JavaScript Date objects for comparison
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);
  
    // Filter bookings for the selected freelancer
    const freelancerBookings = booking.filter(b => b.userId === userId);
  
    // Check if new project dates overlap with any existing bookings
    const isOverlapping = freelancerBookings.some(b => {
      const bookedStart = new Date(b.startDate);
      const bookedEnd = new Date(b.endDate);
      return (newStart <= bookedEnd && newEnd >= bookedStart); // Overlapping condition
    });
  
    if (isOverlapping) {
      alert('Freelancer is already booked for the selected dates. Please choose different dates.');
      return;
    }
  
    console.log('Project Details:', projectDetails);
    
    axios.post('http://localhost:8500/addproject', projectDetails, { headers: { id: userID } })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  
    handleClose();
  };

  if (loading) {
    return <div>Loading freelancers...</div>;
  }

  return (
    <Container>
      <h3 className="mb-4">Freelancers</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {freelancers.map((freelancer) => (
          <Col md={4} key={freelancer._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`http://localhost:8500/${freelancer.image}`} alt={freelancer.username} style={{ width: "150px" }} />
              <Card.Body>
                <Card.Title>{freelancer.username}</Card.Title>
                <Card.Text>Email: {freelancer.email}</Card.Text>
                <Card.Text>Experience: {freelancer.experience} years</Card.Text>
                <Card.Text>Category: {freelancer.category}</Card.Text>
                <Card.Link href={`http://localhost:8500/${freelancer.certificate}`} target="_blank">View Certificate</Card.Link>
                <Button variant="success" className="mt-2" onClick={() => handleShow(freelancer)}>
                  ADD
                </Button>
                <Button variant="info" className="mt-2" onClick={() => handleViewWorks(freelancer._id)}>
                  View Works
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Project Assignment Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Project to {selectedFreelancer?.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" name="projectName" value={projectDetails.projectName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" value={projectDetails.startDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" value={projectDetails.endDate} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleRequest}>Request</Button>
        </Modal.Footer>
      </Modal>

      {/* Freelancer Works Modal */}
      <Modal show={showPhotos} onHide={() => setShowPhotos(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Freelancer Works</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {freelancerPhotos.length > 0 ? (
              freelancerPhotos.map((photo, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={`http://localhost:8500/${photo.images}`} alt="Work"  style={{ height: '200px', objectFit: 'contain' }} />
                  </Card>
                </Col>
              ))
            ) : (
              <p>No works available for this freelancer.</p>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
