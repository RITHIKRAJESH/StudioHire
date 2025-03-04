import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Complaints() {
    const [complaint, setComplaint] = useState('');
    const [freelancerName, setFreelancerName] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8500/addComplaints', {
                complaint,
                freelancerName,
            },{headers:{id:userId}});

            setMessage(response.data.msg || 'Complaint submitted successfully');
            setComplaint('');
            setFreelancerName('');
        } catch (err) {
            console.error('Error submitting complaint', err);
            setError(err.response?.data?.msg || 'Failed to submit complaint');
        }
    };

    return (
        <Container className="mt-4" style={{ maxWidth: '600px' }}>
            <h2 className="mb-3">Submit a Complaint</h2>

            {/* Success & Error Alerts */}
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Complaint</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={complaint} 
                        onChange={(e) => setComplaint(e.target.value)} 
                        required 
                        placeholder="Enter your complaint"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Freelancer Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={freelancerName} 
                        onChange={(e) => setFreelancerName(e.target.value)} 
                        required 
                        placeholder="Enter freelancer's name"
                    />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={!complaint.trim() || !freelancerName.trim()}
                >
                    Submit Complaint
                </Button>
            </Form>
        </Container>
    );
}
