import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image, ListGroup, Modal, Alert } from 'react-bootstrap';

export default function ViewEquipments() {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        startDate: '',
        endDate: '',
        totalAmount: 0,
    });
    const [formError, setFormError] = useState('');

    // Fetch the equipment list on component mount
    useEffect(() => {
        fetchEquipmentList();
    }, []);

    // Fetch the equipment list
    const fetchEquipmentList = () => {
        axios.get("http://localhost:8500/admin/equipments")
            .then((res) => {
                setEquipmentList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Handle booking form changes
    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails({
            ...bookingDetails,
            [name]: value
        });
    };

    // Calculate total amount based on the number of days and caution deposit
    const calculateTotalAmount = () => {
        if (bookingDetails.startDate && bookingDetails.endDate && selectedEquipment) {
            const startDate = new Date(bookingDetails.startDate);
            const endDate = new Date(bookingDetails.endDate);
            const timeDiff = endDate - startDate;

            if (timeDiff < 0) {
                setFormError('End date must be later than start date.');
                return;
            }

            const daysDiff = timeDiff / (1000 * 3600 * 24);
            const totalAmount = (daysDiff * selectedEquipment.rentPerDay) + parseFloat(selectedEquipment.cautionDeposit);
            setBookingDetails({
                ...bookingDetails,
                totalAmount
            });
            setFormError('');
        }
    };

    // Validate the date (not allowing previous dates)
    const validateDate = (date) => {
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        return date >= today;
    };

    // Handle form submission for booking equipment
    const handleBookingSubmit = (e) => {
        e.preventDefault();

        if (!bookingDetails.startDate || !bookingDetails.endDate || bookingDetails.totalAmount <= 0) {
            setFormError('Please fill all fields correctly.');
            return;
        }

        // Get userId from localStorage
        const userId = localStorage.getItem('userId');

        // Check if the dates are valid
        if (!validateDate(bookingDetails.startDate) || !validateDate(bookingDetails.endDate)) {
            setFormError('Start date and End date must not be in the past.');
            return;
        }

        // Log booking details to the console
        console.log("Booking Details:");
        console.log("userId:", userId);
        console.log("equipmentId:", selectedEquipment._id);
        console.log("startDate:", bookingDetails.startDate);
        console.log("endDate:", bookingDetails.endDate);
        console.log("totalAmount:", bookingDetails.totalAmount);

        // Prepare the booking data
        const bookingData = {
            equipmentId: selectedEquipment._id,
            startDate: bookingDetails.startDate,
            endDate: bookingDetails.endDate,
            totalAmount: bookingDetails.totalAmount,
        };
      console.log(bookingData)
        // Send booking request
        axios.post("http://localhost:8500/bookequipment", bookingData, {
            headers: {
                id: userId
            }
        })
        .then((res) => {
            alert(res.data.message);
            setBookingDetails({ startDate: '', endDate: '', totalAmount: 0 }); // Reset booking form
            setSelectedEquipment(null); // Reset selected equipment
        }).catch((err) => {
            console.log(err);
            alert(err)
        });
    };

    return (
        <Container>
            {/* Equipment List */}
            <h2 className="my-4">Available Equipment for Booking</h2>
            <ListGroup>
                {equipmentList.map((item, index) => (
                    <ListGroup.Item key={index} onClick={() => setSelectedEquipment(item)}>
                        <Row>
                            <Col md={2}>
                                <Image
                                    src={`http://localhost:8500/${item.image}`}
                                    alt={item.name}
                                    thumbnail
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                            </Col>
                            <Col md={6}>
                                <h5>{item.name}</h5>
                                <p>Caution Deposit: {item.cautionDeposit}</p>
                                <p>Rent Per Day: {item.rentPerDay}</p>
                                <p>Status: {item.status}</p>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Booking Form Modal */}
            {selectedEquipment && (
                <Modal show={true} onHide={() => setSelectedEquipment(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book Equipment: {selectedEquipment.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formError && <Alert variant="danger">{formError}</Alert>}
                        <Form onSubmit={handleBookingSubmit}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="startDate">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="startDate"
                                            value={bookingDetails.startDate}
                                            onChange={handleBookingChange}
                                            onBlur={calculateTotalAmount}
                                            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="endDate">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="endDate"
                                            value={bookingDetails.endDate}
                                            onChange={handleBookingChange}
                                            onBlur={calculateTotalAmount}
                                            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="totalAmount">
                                        <Form.Label>Total Amount</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="totalAmount"
                                            value={bookingDetails.totalAmount}
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type="submit">
                                Confirm Booking
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
}
