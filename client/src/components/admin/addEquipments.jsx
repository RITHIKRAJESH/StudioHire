import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image, ListGroup, Modal, Alert } from 'react-bootstrap';

export default function Equipments() {
    const [equipment, setEquipment] = useState({
        name: '',
        image: null,
        cautionDeposit: '',
        rentPerDay: '',
        status: ''
    });
    const [equipmentList, setEquipmentList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState('');
    const [editing, setEditing] = useState(null); // To track if we are editing an existing equipment

    // Fetch the equipment list on component mount
    useEffect(() => {
        fetchEquipmentList();
    }, []);

    // Fetch the equipment list after changes (add, update, delete)
    const fetchEquipmentList = () => {
        axios.get("http://localhost:8500/admin/equipments")
            .then((res) => {
                setEquipmentList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipment({
            ...equipment,
            [name]: value
        });
    };

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEquipment({
                ...equipment,
                image: file // Store the file object for FormData
            });
        }
    };

    // Handle form submission for adding and updating equipment
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        if (!equipment.name || !equipment.cautionDeposit || !equipment.rentPerDay || !equipment.status) {
            setFormError('All fields are required!');
            return;
        }

        // Check if numeric fields are numbers
        if (isNaN(equipment.cautionDeposit) || isNaN(equipment.rentPerDay)) {
            setFormError('Caution Deposit and Rent Per Day must be valid numbers!');
            return;
        }

        setFormError(''); // Clear any previous errors

        const formData = new FormData();
        formData.append('name', equipment.name);
        formData.append('cautionDeposit', equipment.cautionDeposit);
        formData.append('rentPerDay', equipment.rentPerDay);
        formData.append('status', equipment.status);

        if (equipment.image) {
            formData.append('image', equipment.image);
        }

        if (editing) {
            // Update existing equipment
            axios.put(`http://localhost:8500/admin/updateequipment`, formData,{headers:{_id:editing._id}})
                .then((res) => {
                    alert(res.data);
                    setShowForm(false);
                    fetchEquipmentList(); // Fetch the updated list
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            // Add new equipment
            axios.post("http://localhost:8500/admin/addequipment", formData)
                .then((res) => {
                    alert(res.data);
                    setShowForm(false);
                    fetchEquipmentList(); // Fetch the updated list
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    // Handle Delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this equipment?")) {
            axios.delete(`http://localhost:8500/admin/deleteequipment`,{headers:{_id:id}})
                .then((res) => {
                    alert(res.data);
                    fetchEquipmentList(); // Fetch the updated list after deletion
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    // Handle Edit
    const handleEdit = (item) => {
        setEditing(item);
        setEquipment({
            name: item.name,
            image: null,
            cautionDeposit: item.cautionDeposit,
            rentPerDay: item.rentPerDay,
            status: item.status
        });
        setShowForm(true);
    };

    return (
        <Container>
            {/* Equipment List */}
            <h2 className="my-4">Equipment List</h2>
            <ListGroup>
                {equipmentList.map((item, index) => (
                    <ListGroup.Item key={index}>
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
                            <Col md={2}>
                                <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(item._id)} style={{ marginLeft: '10px' }}>Delete</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Add/Edit Equipment Form - Modal */}
            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? 'Edit Equipment' : 'Add Equipment'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formError && <Alert variant="danger">{formError}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={equipment.name}
                                        onChange={handleChange}
                                        placeholder="Enter equipment name"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                    {equipment.image && (
                                        <Image
                                            src={URL.createObjectURL(equipment.image)}
                                            alt="Equipment"
                                            thumbnail
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                                        />
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="cautionDeposit">
                                    <Form.Label>Caution Deposit</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cautionDeposit"
                                        value={equipment.cautionDeposit}
                                        onChange={handleChange}
                                        placeholder="Enter caution deposit"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="rentPerDay">
                                    <Form.Label>Rent Per Day</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="rentPerDay"
                                        value={equipment.rentPerDay}
                                        onChange={handleChange}
                                        placeholder="Enter rent per day"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="status">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="status"
                                        value={equipment.status}
                                        onChange={handleChange}
                                        placeholder="Enter status"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            {editing ? 'Update Equipment' : 'Add Equipment'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Floating Button to Show Add Form */}
            <Button
                variant="success"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '30px',
                    padding: '0',
                }}
                onClick={() => {
                    setEditing(null); // Reset editing state when adding new equipment
                    setShowForm(true);
                }}
            >
                +
            </Button>
        </Container>
    );
}
