import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

export default function Viewprojects() {
    const [projects, setProjects] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({});

    useEffect(() => {
        const id = localStorage.getItem('userId');
        axios.get("http://localhost:8500/viewbooking", { headers: { id: id } })
            .then((res) => {
                setProjects(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.error("Error fetching projects", err);
            });
    }, []);

    const handleStatusChange = (projectId, value) => {
        setStatusUpdates(prev => ({ ...prev, [projectId]: value }));
    };

    const updateStatus = (projectId, userId) => {
        const updatedStatus = statusUpdates[projectId] || "Pending";
        const updation = { "UserId": userId, "ProjectId": projectId, "Status": updatedStatus };

        axios.put("http://localhost:8500/updatebooking", updation)
            .then((res) => {
                alert(res.data);
                // Update the status locally without reloading
                setProjects(prevProjects =>
                    prevProjects.map(p =>
                        p._id === projectId ? { ...p, status: updatedStatus } : p
                    )
                );
            })
            .catch((err) => {
                console.error("Error updating status", err);
            });
    };

    // Filter out projects where status is "Finished" or "Cancelled"
    const filteredProjects = projects.filter(
        (project) => project.status !== "Finished" && project.status !== "Cancelled" && project.status !=="Payment Successful"
    );

    return (
        <div className="container mt-4">
            <h1 className="mb-3">View Projects</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Project ID</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No active projects available.
                            </td>
                        </tr>
                    ) : (
                        filteredProjects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.userId}</td>
                                <td>{project._id}</td>
                                <td>{project.projectName}</td>
                                <td>{project.startDate}</td>
                                <td>{project.endDate}</td>
                                <td>{project.status}</td>
                                <td>
                                    <Form.Select
                                        value={statusUpdates[project._id] || project.status}
                                        onChange={(e) => handleStatusChange(project._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Declined">Decline</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Finished">Finished</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <Button variant="primary" onClick={() => updateStatus(project._id, project.userId)}>
                                        Update Status
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
