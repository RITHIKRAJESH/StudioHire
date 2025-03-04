import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img1 from '../dev2.jpg';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // Default role is 'client'
    const [experience, setExperience] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [category,setCategory]=useState('')
    const [certificate, setCertificate] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role', role);
            if (role === 'user') {
                formData.append('experience', experience);
                formData.append('companyName', companyName);
                formData.append('certificate', certificate);
                formData.append('image', image);
                formData.append('category',category)
            }
            
            const response = await axios.post('http://localhost:8500/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            console.log(response.data);
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (err) {
            setError('User already exists or there was a problem.');
            console.error(err.message);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${img1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container className="mt-5" style={{ maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center mb-4">Register</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="client">Client</option>
                            <option value="user">Freelancer</option>
                        </Form.Control>
                    </Form.Group>

                    {role === 'user' && (
                        <>
                            <Form.Group controlId="image">
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </Form.Group>

                            <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={role} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">--select category--</option>
                            <option value="Editor">Editor</option>
                            <option value="Photographer">Photographer</option>
                        </Form.Control>
                    </Form.Group>

                            <Form.Group controlId="experience">
                                <Form.Label>Experience</Form.Label>
                                <Form.Control type="text" placeholder="Enter your experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="companyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="certificate">
                                <Form.Label>Certificate</Form.Label>
                                <Form.Control type="file" onChange={(e) => setCertificate(e.target.files[0])} />
                            </Form.Group>
                        </>
                    )}

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default RegisterPage;
