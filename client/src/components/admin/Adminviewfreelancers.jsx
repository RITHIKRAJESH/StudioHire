import React, { useState, useEffect } from 'react';
import { Button, Table, Alert } from 'react-bootstrap'; // Using React-Bootstrap for UI components
import axios from 'axios'; // Assuming you will use axios to interact with an API

export default function Adminviewfreelancers() {
  const [freelancers, setFreelancers] = useState([]); // State to hold freelancers list
  const [error, setError] = useState(''); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        console.log("fetching");
        const response = await axios.get('http://localhost:8500/admin/viewuser');
        console.log(response.data);
        setFreelancers(response.data);
      } catch (err) {
        setError('Error fetching freelancers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const handleVerify = async (freelancerId) => {
    try {
      console.log(freelancerId);
      const response = await axios.put(`http://localhost:8500/admin/verify`, {}, { headers: { _id: freelancerId } });
      alert(response.data);
      if (response.status === 200) {
        setFreelancers(freelancers.map(freelancer =>
          freelancer._id === freelancerId ? { ...freelancer, status: 'Verified' } : freelancer
        ));
      }
    } catch (err) {
      setError('Error updating freelancer status');
      console.error(err);
    }
  };

  // Handle delete functionality
  const handleDelete = async (freelancerId) => {
    try {
      const response = await axios.delete(`http://localhost:8500/admin/deleteuser`, {
        headers: { _id: freelancerId }
      });
      alert(response.data);
      if (response.status === 200) {
        setFreelancers(freelancers.filter(freelancer => freelancer._id !== freelancerId));
      }
    } catch (err) {
      setError('Error deleting freelancer');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading freelancers...</div>;
  }

  return (
    <div>
      <h3>Freelancers</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Certificate</th>
            <th>Experience</th>
            <th>Category</th>
            <th>Status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {freelancers.map((freelancer) => (
            <tr key={freelancer._id}>
              <td>{freelancer._id}</td>
              <td>{freelancer.username}</td>
              <td>{freelancer.email}</td>
              <td><a href={`http://localhost:8500/${freelancer.certificate}`} target="_blank" rel="noopener noreferrer">View Certificate</a></td>
              <td>{freelancer.experience}</td>
              <td>{freelancer.category}</td>
              <td>{freelancer.status}</td>
              <td>
                {freelancer.status !== 'Verified' && (
                  <Button variant="success" onClick={() => handleVerify(freelancer._id)}>
                    Verify
                  </Button>
                )}
                {freelancer.status === 'Verified' && (
                  <span className="text-success">Verified</span>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(freelancer._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
