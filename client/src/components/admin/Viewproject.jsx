import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function Viewproject() {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [projectDetails, setProjectDetails] = useState({ projectName: '', startDate: '', endDate: '', userId: '' });
  const [booking, setBooking] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [freelancerPhotos, setFreelancerPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for filter

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get('http://localhost:8500/admin/viewuser');
        const book = await axios.get('http://localhost:8500/booking');
        const photosRes = await axios.get('http://localhost:8500/viewphotos');

        setPhotos(photosRes.data);
        setBooking(book.data);
        setFreelancers(response.data);
        setFilteredFreelancers(response.data); // Set initially to all freelancers
      } catch (err) {
        setError('Error fetching freelancers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  // Function to filter freelancers by category
  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredFreelancers(freelancers);
    } else {
      const filtered = freelancers.filter(freelancer => freelancer.category === category);
      setFilteredFreelancers(filtered);
    }
  };

  const handleShow = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setProjectDetails({ ...projectDetails, userId: freelancer._id });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setProjectDetails({ projectName: '', startDate: '', endDate: '', userId: '' });
  };

  const handleViewWorks = (freelancerId) => {
    const filteredPhotos = photos.filter(photo => photo.userId === freelancerId);
    setFreelancerPhotos(filteredPhotos);
    setShowPhotos(true);
  };

  
  if (loading) {
    return <div>Loading freelancers...</div>;
  }
  const today = new Date().toISOString().split("T")[0];
  return (
    <Container>
      <h3 className="mb-4">Freelancers</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Filter Dropdown */}
      <Form.Group as={Row} className="mb-4">
        <Col md={6}>
          <Form.Select onChange={handleFilterChange} value={selectedCategory}>
            <option value="all">Show All</option>
            <option value="Photographer">Photographers</option>
            <option value="Editor">Editors</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Row>
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map((freelancer) => (
            <Col md={4} key={freelancer._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`http://localhost:8500/${freelancer.image}`} alt={freelancer.username} style={{ width: "150px" }} />
                <Card.Body>
                  <Card.Title>{freelancer.username}</Card.Title>
                  <Card.Text>Email: {freelancer.email}</Card.Text>
                  <Card.Text>Experience: {freelancer.experience} years</Card.Text>
                  <Card.Text>Category: {freelancer.category}</Card.Text>
                  <Button variant="success" className="mt-2" onClick={() => handleShow(freelancer)}>ADD</Button>
                  <Button variant="info" className="mt-2 ms-2" onClick={() => handleViewWorks(freelancer._id)}>View Works</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No freelancers found in this category.</p>
        )}
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
              <Form.Control type="text" name="projectName" value={projectDetails.projectName} onChange={(e) => setProjectDetails({ ...projectDetails, projectName: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" value={projectDetails.startDate} onChange={(e) => setProjectDetails({ ...projectDetails, startDate: e.target.value })} required min={projectDetails.startDate || today} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" value={projectDetails.endDate} onChange={(e) => setProjectDetails({ ...projectDetails, endDate: e.target.value })} required   min={projectDetails.endDate || today} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary">Request</Button>
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
                    <Card.Img variant="top" src={`http://localhost:8500/${photo.images}`} alt="Work" style={{ height: '200px', objectFit: 'contain' }} />
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
