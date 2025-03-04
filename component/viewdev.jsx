import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import './Adminviewdev.css'; // Import your custom CSS file for styling

export default function Adminviewdev() {
  const idn = sessionStorage.getItem('userid');
  const [exp, setExp] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(new Array(developers.length).fill(false));

  useEffect(() => {
    const url = `http://localhost:8000/fetchalldev`;
    axios.get(url)
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching developers:', error);
      });
  }, []);

  const toggleDetails = (index) => {
    setIsDetailsVisible((prevDetailsVisible) => {
      const updatedDetailsVisible = [...prevDetailsVisible];
      updatedDetailsVisible[index] = !prevDetailsVisible[index];
      return updatedDetailsVisible;
    });
  };

  const deleteReq = (userId) => {
    let ans = window.confirm('Do you want to Delete?');
    if (ans) {
      const url = `http://localhost:8000/deletedev/${userId}`;
      axios.get(url).then((res) => {
        window.location.reload();
        alert(res.data);
      });
    } else {
      alert('Deletion Cancelled');
    }
  };

  return (
    <Container>
 
      {developers.length > 0 ? (
        <Row>
          {developers
          
            .map((developer, index) => (
              <Col xs={12} md={6} lg={4} key={developer.id} className='rounded shadow p-2 border mt-3'>
                <Card className="custom-card">
                  <div className="img-container">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8000/${developer.imageUrl}`}
                      alt={developer.fullname}
                      className="zoom-effect"
                    
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{developer.fullname}</Card.Title>
                
               
                        <Card.Text><strong>Expertise:</strong> {developer.expertise}</Card.Text>
                
                      
                     
                 
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      ) : (
        <p>No Workers found.</p>
      )}
    </Container>
  );
}
