import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function AddWork() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMessage("User ID not found in local storage");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8500/addphoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "id": userId
        },
      });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage("Error uploading work");
      console.error(error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Add Work</h2>
      {message && <Alert variant={message.includes("Error") ? "danger" : "success"}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mt-3 w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
