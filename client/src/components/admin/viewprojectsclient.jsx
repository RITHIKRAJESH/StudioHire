import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function ViewprojectClient() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const id = localStorage.getItem("userId");
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8500/viewbookingclient', { headers: { id: id } });

        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  // Exclude projects where status is "Finished" or "Cancelled"
  const filteredProjects = projects.filter(
    (project) => project.status !== "Finished" && project.status !== "Cancelled"&& project.status !=="Payment Successful"
  );

  return (
    <div className="container mt-4">
      <h3>Projects</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Name</th>
            <th>Freelancer</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No active projects available.
              </td>
            </tr>
          ) : (
            filteredProjects.map((project) => (
              <tr key={project._id}>
                <td>{project._id}</td>
                <td>{project.projectName}</td>
                <td>{project.userId?.username || "N/A"}</td>
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
