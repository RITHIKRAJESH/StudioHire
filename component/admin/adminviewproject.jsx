import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

export default function Viewproject() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/fetchallproject')
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching developers:', error);
      });
  }, []);

  const verify = (id) => {
    axios.post("http://localhost:8000/verify", { id, status: 'verified' })
      .then(() => {
        setDevelopers((prevDevelopers) => 
          prevDevelopers.map(dev => 
            dev._id === id ? { ...dev, status: 'verified' } : dev
          )
        );
      })
      .catch((error) => {
        console.error('Error verifying project:', error);
      });
  };

  return (
    <Container>
      <center>
        <h1>VIEW PROJECT DETAILS</h1>
        <h5>Crafting Tomorrow's Solutions Today</h5>
      </center>
      {developers.length > 0 ? (
        <Table striped bordered hover responsive className='mt-3'>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Client Name</th>
              <th>Developer Name</th>
              <th>Deadline</th>
              <th>Project Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {developers.map((developer, index) => (
              <tr key={developer._id}>
                <td>{index + 1}</td>
                <td>{developer.pname}</td>
                <td>{developer.cname}</td>
                <td>{developer.dname}</td>
                <td>{developer.deadline}</td>
                <td>{developer.pdesc}</td>
                <td>{developer.status || 'Pending'}</td>
                <td>
                  {developer.status !== 'verified' && (
                    <Button variant="success" size="sm" onClick={() => verify(developer._id)}>
                      Verify
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No projects found.</p>
      )}
    </Container>
  );
}
