import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap'; // Added Table and Alert from react-bootstrap
import axios from 'axios'; // Import axios for HTTP requests

export default function Viewproject() {
  const [projects, setProjects] = useState([]); // State to hold project data
  const [error, setError] = useState(''); // State to handle error messages
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Fetch projects data from the server
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8500/admin/viewprojects');
        setProjects(response.data); // Update state with the fetched projects data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to fetch projects'); // Handle error
        setLoading(false);
      }
    };

    fetchProjects(); // Call the function to fetch projects data
  }, []);

  if (loading) {
    return <div>Loading projects...</div>; // Show loading message while data is being fetched
  }

  return (
    <div>
      <h3>Projects</h3>
      {error && <Alert variant="danger">{error}</Alert>} {/* Show error if there's an issue fetching data */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No projects available.
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project._id}>
                <td>{project._id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
