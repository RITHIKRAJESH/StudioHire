import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import img1 from '../dev1.jpg';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [forgotPassword, setForgotPassword] = useState(false); // Track if forgot password modal is shown
    const [otp, setOtp] = useState(''); // Store OTP from backend
    const [otpEntered, setOtpEntered] = useState(''); // Store OTP entered by the user
    const [newPassword, setNewPassword] = useState(''); // Store new password
    const [confirmPassword, setConfirmPassword] = useState(''); // Store confirm new password
    const [passwordUpdated, setPasswordUpdated] = useState(false); // Flag to track password update status
    const navigate = useNavigate();

    // Validation Function
    const validateForm = () => {
        let newErrors = {};

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePasswordFields = () => {
        let newErrors = {};
        
        if (!newPassword) {
            newErrors.newPassword = "New password is required.";
        } else if (newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters.";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required.";
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        try {
            if (email === "admin@gmail.com" && password === "admin123") {
                navigate("/adminhome");
                localStorage.setItem('userId', '12345');
                localStorage.setItem('token', '12345');
                return;
            }

            const response = await axios.post('http://localhost:8500/login', { email, password });
            localStorage.setItem('token', response.data.token);
            const decoded = jwtDecode(response.data.token);
            localStorage.setItem('userId', decoded.id);

            if (decoded.role === "user" && decoded.status === "verified") {
                navigate("/user");
            } else if (decoded.role === "client") {
                navigate("/client");
            }
        } catch (err) {
            setError('Invalid credentials');
            console.error(err.message);
        }
    };

    // Handle Forgot Password
    const handleForgotPassword = () => {
        setForgotPassword(true); // Show the forgot password modal
    };

    // Send OTP to email for password reset
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8500/forgot-password', { email });
            setOtp(response.data.otp); // Store OTP received from backend
            alert('OTP sent to your email');
        } catch (err) {
            setError('Error sending OTP');
            console.error(err.message);
        }
    };

    // Verify OTP entered by the user
    const verifyOtp = () => {
        if (otpEntered === otp) {
            alert("OTP Verified successfully. You can now reset your password.");
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    // Update the password after OTP verification
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (!validatePasswordFields()) return;

        try {
            const response = await axios.put('http://localhost:8500/update-password', {
                email, otp: otpEntered, newPassword
            });
            setPasswordUpdated(true);
            alert(response.data.msg);
            setForgotPassword(false); // Close the modal after password reset
        } catch (err) {
            console.error(err.message);
            alert("Error occurred while updating the password.");
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
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password" className="mt-3">
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

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>

                    <Row className="mt-3">
                        <Col className="text-center">
                            <a href="/register">Don't have an account? Register here</a>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="text-center">
                            <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
                        </Col>
                    </Row>
                </Form>
            </Container>

            {/* Forgot Password Modal */}
            <Modal show={forgotPassword} onHide={() => setForgotPassword(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSendOtp}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Send OTP
                        </Button>
                    </Form>
                    <Form onSubmit={handlePasswordUpdate} className="mt-3">
                        <Form.Group controlId="otp">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter OTP"
                                value={otpEntered}
                                onChange={(e) => setOtpEntered(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="secondary" type="button" onClick={verifyOtp} className="w-100 mt-3">
                            Verify OTP
                        </Button>

                        {otpEntered === otp && (
                            <>
                                <Form.Group controlId="newPassword" className="mt-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        isInvalid={!!errors.newPassword}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="confirmPassword" className="mt-3">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        isInvalid={!!errors.confirmPassword}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    Update Password
                                </Button>
                            </>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginPage;
