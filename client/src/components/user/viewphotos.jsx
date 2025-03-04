import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

export default function ViewPhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get("http://localhost:8500/viewphotosuser", { headers: { id: userId } })
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center">Your Photos</h2>
      <Row>
        {photos.map((photo, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img 
                variant="top" 
                src={`http://localhost:8500/${photo.images}`} 
                alt="Uploaded Work" 
                style={{ height: '300px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Text>{photo.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
