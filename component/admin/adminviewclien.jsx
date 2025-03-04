import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Card, CardImg, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

export default function Adminviewcli() {
  const [developers, setDevelopers] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/fetchallcli')
      .then(response => {
        setDevelopers(response.data);
        setIsDetailsVisible(new Array(response.data.length).fill(false));
      })
      .catch(error => console.error('Error fetching developers:', error));
  }, []);

  const toggleDetails = index => {
    setIsDetailsVisible(prev => {
      const updated = [...prev];
      updated[index] = !prev[index];
      return updated;
    });
  };

  const deleteReq = userId => {
    if (window.confirm('Do you want to Delete?')) {
      axios.get(`http://localhost:8000/deletecli/${userId}`).then(res => {
        alert(res.data);
        setDevelopers(prev => prev.filter(dev => dev._id !== userId));
      });
    } else {
      alert('Deletion Cancelled');
    }
  };

  return (
    <Container>
      <center>
        <h1>MEET OUR CLIENT</h1>
        <h5>Crafting Tomorrow's Solutions Today</h5>
      </center>
      <div className="d-none d-md-block">
        {developers.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {developers.map((developer, index) => (
                <tr key={developer.id}>
                  <td>
                    <img
                      src={`http://localhost:8000/${developer.imageUrl}`}
                      alt={developer.fullname}
                      style={{ width: '100px', height: '50px' }}
                    />
                  </td>
                  <td>{developer.fullname}</td>
                  <td>{developer.address}</td>
                  <td>{developer.phone}</td>
                  <td><a href={`mailto:${developer.email}`}>{developer.email}</a></td>
                  <td>
                    <MdDelete
                      onClick={() => deleteReq(developer._id)}
                      style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No developers found.</p>
        )}
      </div>

      <div className="d-block d-md-none">
        {developers.length > 0 ? (
          <Row>
            {developers.map((developer, index) => (
              <Col xs={12} key={developer.id} className='rounded shadow p-2 border mt-3'>
                <Card>
                  <CardImg variant="top" src={`http://localhost:8000/${developer.imageUrl}`} alt={developer.fullname} style={{ width: '100%', height: '150px' }} />
                  <CardBody>
                    <CardTitle>{developer.fullname}</CardTitle>
                    {!isDetailsVisible[index] && (
                      <Button variant="primary" size="sm" onClick={() => toggleDetails(index)}>
                        View More
                      </Button>
                    )}
                    {isDetailsVisible[index] && (
                      <>
                        <ListGroupItem><strong>Address:</strong> {developer.address}</ListGroupItem>
                        <ListGroupItem><strong>Phone:</strong> {developer.phone}</ListGroupItem>
                        <ListGroupItem>
                          <strong>Email:</strong>
                          <a href={`mailto:${developer.email}`}>{developer.email}</a>
                        </ListGroupItem>
                        <Button variant="secondary" size="sm" onClick={() => toggleDetails(index)}>
                          View Less
                        </Button>
                        <MdDelete
                          onClick={() => deleteReq(developer._id)}
                          style={{ color: 'black', fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
                        />
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No developers found.</p>
        )}
      </div>
    </Container>
  );
}