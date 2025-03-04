import React, { useState, useEffect } from 'react';
import { Table, Alert, Button } from 'react-bootstrap'; // Added Button import
import axios from 'axios'; 

export default function Adminviewclients() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8500/admin/viewclient');
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch clients');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Handle client deletion
  const handleDelete = async (clientId) => {
    try {
      const response = await axios.delete(`http://localhost:8500/admin/deleteclient`, {
        headers: { _id: clientId }
      });
      alert(response.data); // Show alert with the response message

      if (response.status === 200) {
        setClients(clients.filter(client => client._id !== clientId)); // Remove deleted client from state
      }
    } catch (err) {
      setError('Failed to delete client');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div>
      <h3>Clients</h3>
      {error && <Alert variant="danger">{error}</Alert>} {/* Show error message if there's an error */}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No clients available.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client._id}>
                <td>{client._id}</td>
                <td>{client.username}</td>
                <td>{client.email}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(client._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
