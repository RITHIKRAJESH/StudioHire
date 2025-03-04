import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

export default function Clientreqview() {
    const idn = sessionStorage.getItem('userid');
    const [record, setRecord] = useState([]);

    useEffect(() => {
        const url = `http://localhost:8000/clientreq/${idn}`;
        axios.get(url).then((res) => {
            setRecord(res.data);
        });
    }, [idn]);

    const deleteReq = (userId) => {
        let ans = window.confirm('Do you want to Delete?');
        if (ans) {
            const url = `http://localhost:8000/deletereq/${userId}`;
            axios.get(url).then((res) => {
                window.location.reload();
                alert(res.data);
            });
        } else {
            alert('Deletion Cancelled');
        }
    };

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Project Type</th>
                        <th>Requirement</th>
                        <th>Proof</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {record.map((ls) => (
                        <tr key={ls._id}>
                            <td>{ls.projecttype}</td>
                            <td>{ls.requirement}</td>
                            <td>
                                <a href={`http://localhost:8000/${ls.proof}`} download>
                                    Download Proof
                                </a>
                            </td>
                            <td>
                                <MdDelete
                                    onClick={() => {
                                        deleteReq(ls._id);
                                    }}
                                    style={{ color: 'black', fontSize: '20px' }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
