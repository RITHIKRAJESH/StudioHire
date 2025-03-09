import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

export default function Payment() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        axios.get("http://localhost:8500/viewbooking", { headers: { id: id } })
            .then((res) => {
                // Filter projects where status is "Finished"
                const finishedProjects = res.data.filter(project => project.status === "Finished" ||project.status === "Payment Successful" );
                setProjects(finishedProjects);
            })
            .catch((err) => {
                console.error("Error fetching projects", err);
            });
    }, []);

    const updateStatus = (projectId, userId) => {
        const updatedStatus = "Payment Successful";
        const updation = { "UserId": userId, "ProjectId": projectId, "Status": updatedStatus };

        axios.put("http://localhost:8500/updatebooking", updation)
            .then((res) => {
                alert(res.data);
                // Update the status locally to avoid page reload
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

    return (
        <div className="container mt-4">
            <h1 className="mb-3">Completed Projects - Payment</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Project ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No completed projects available for payment.
                            </td>
                        </tr>
                    ) : (
                        projects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.clientId?.username || "N/A"}</td>
                                <td>{project._id}</td>
                                <td>{project.projectName}</td>
                                <td>{project.status}</td>
                                <td>
    <Button 
        variant="success" 
        onClick={() => updateStatus(project._id, project.userId)}
        disabled={project.status === "Payment Successful"}
    >
        Mark as Paid
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
