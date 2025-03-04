// LoginPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import img1 from '../dev1.jpg'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if(email=="admin@gmail.com" && password=="admin123"){
                navigate("/adminhome")}
            const response = await axios.post('http://localhost:8500/login', { email, password });
            localStorage.setItem('token', response.data.token);
            const decoded = jwtDecode(response.data.token);
            console.log(decoded);
            console.log(decoded.id);
            localStorage.setItem('userId', decoded.id);
            if (decoded.role === "user" &&  decoded.status=="verified") {
                navigate("/user");
            } else if(decoded.role==="client") {
                navigate("/client");  
            }
           
        } catch (err) {
            setError('Invalid credentials');
            console.error(err.message);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${img1})`,  // Replace with your background image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container style={{ maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>

                    <Row className="mt-3">
                        <Col className="text-center">
                            <a href="/register">Don't have an account? Register here</a>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default LoginPage;
