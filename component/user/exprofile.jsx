import { useEffect, useState } from 'react';
import AXIOS from 'axios';
import { Container, Table, Card } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';

export default function Exprofile() {
    const idn = sessionStorage.getItem('userid');
    const [record, setRecord] = useState([]);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const url = `http://localhost:8000/expviews/${idn}`;
        AXIOS.get(url).then((res) => {
            setRecord(res.data);
        });
    }, []);

    const deleteExperience = (userId) => {
        let ans = window.confirm("Do you want to delete this record?");
        if (ans) {
            const url = `http://localhost:8000/deleteexperience/${userId}`;
            AXIOS.get(url).then((res) => {
                window.location.reload();
                alert(res.data);
            });
        } else {
            alert('Deletion Cancelled');
        }
    };

    return (
        <Container>
            {isMobile ? (
                record.map((ls) => (
                    <Card key={ls._id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{ls.cname}</Card.Title>
                            <Card.Text><strong>Experience:</strong> {ls.expr}</Card.Text>
                            <Card.Text><strong>Works:</strong> {ls.work}</Card.Text>
                            <Card.Text>
                                <strong>Experience Certificate:</strong>{' '}
                                <a href={`http://localhost:8000/${ls.proof}`} download>Download</a>
                            </Card.Text>
                            <MdDelete
                                onClick={() => deleteExperience(ls._id)}
                                style={{ color: "black", fontSize: "20px", cursor: "pointer" }}
                            />
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <Table striped bordered hover>
                    <thead><br></br>
                        <tr>
                            <th>Company Name</th>
                            <th>Experience</th>
                            <th>Works</th>
                            <th>Experience-Certificate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.map((ls) => (
                            <tr key={ls._id}>
                                <td>{ls.cname}</td>
                                <td>{ls.expr}</td>
                                <td>{ls.work}</td>
                                <td>
                                    <a href={`http://localhost:8000/${ls.proof}`} download>
                                        Download 
                                    </a>
                                </td>
                                <td>
                                    <MdDelete
                                        onClick={() => deleteExperience(ls._id)}
                                        style={{ color: "black", fontSize: "20px", cursor: "pointer" }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}