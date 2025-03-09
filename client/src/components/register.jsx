import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img1 from '../dev2.jpg';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Fixed to "Freelancer" only
    const [experience, setExperience] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [category, setCategory] = useState('');
    const [certificate, setCertificate] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // **Validation Function**
    const validateForm = () => {
        let newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required.";
        } else if (username.length < 3) {
            newErrors.username = "Username must be at least 3 characters.";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (role === 'user') {
            if (!category.trim()) {
                newErrors.category = "Category is required.";
            }
            if (!experience.trim()) {
                newErrors.experience = "Experience is required.";
            }
            if (!companyName.trim()) {
                newErrors.companyName = "Company Name is required.";
            }
            if (!image) {
                newErrors.image = "Profile Image is required.";
            }
            if (!certificate) {
                newErrors.certificate = "Certificate is required.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // **Submit Handler**
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role', role);
            formData.append('category', category);
            formData.append('experience', experience);
            formData.append('companyName', companyName);
            formData.append('certificate', certificate);
            formData.append('image', image);

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
                <h2 className="text-center mb-4">Freelancer Registration</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            isInvalid={!!errors.category}
                        >
                            <option value="">--Select Category--</option>
                            <option value="Editor">Editor</option>
                            <option value="Photographer">Photographer</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="experience">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            isInvalid={!!errors.experience}
                        />
                        <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="companyName">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            isInvalid={!!errors.companyName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            isInvalid={!!errors.image}
                        />
                        <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="certificate">
                        <Form.Label>Certificate</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setCertificate(e.target.files[0])}
                            isInvalid={!!errors.certificate}
                        />
                        <Form.Control.Feedback type="invalid">{errors.certificate}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default RegisterPage;
