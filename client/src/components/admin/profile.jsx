import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not found in localStorage!');
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8500/profile', {
          headers: { id: userId },
        });
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (err) {
        setError('Error fetching user data!');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Update user profile
//   const handleChange = (e) => {
//     setUpdatedUser({
//       ...updatedUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem('userId');
//     try {
//       await axios.put('http://localhost:8500/profile', updatedUser, {
//         headers: { id: userId },
//       });
//       alert('Profile updated successfully!');
//     } catch (err) {
//       setError('Error updating profile!');
//     }
//   };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Container>
      <h1>Profile</h1>
      {user ? (
        <Form >
          <Row>
            <Col md={6}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={updatedUser.username}
                 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedUser.email}
                 
                />
              </Form.Group>
            </Col>
          </Row>

          {user.role === 'user' && (
            <>
              <Form.Group controlId="image">
                <Form.Label>Profile Image</Form.Label>
                <Image src={`http://localhost:8500/${updatedUser.image}`} alt="Profile" fluid width='150px' />
              </Form.Group>

              <Form.Group controlId="certificate">
                <Form.Label>Certificate</Form.Label>
                <a href={`http://localhost:8500/${updatedUser.certificate}`} target="_blank" rel="noopener noreferrer">
                  View Certificate
                </a>
              </Form.Group>

              <Form.Group controlId="experience">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={updatedUser.experience || ''}
                
                />
              </Form.Group>

              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={updatedUser.companyname || ''}
                 
                />
              </Form.Group>
            </>
          )}

        </Form>
      ) : (
        <p>No user data found!</p>
      )}
    </Container>
  );
}
