import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

export default function Adminviewdev() {
  const idn = sessionStorage.getItem('userid');
  const [exp, setExp] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(new Array(developers.length).fill(false));

  useEffect(() => {
    const url = `http://localhost:8500/admin/viewuser`;
    axios.get(url)
      .then((response) => {
        setDevelopers(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching developers:', error);
      });
  }, []);

  const toggleDetails = (index) => {
    setIsDetailsVisible((prevDetailsVisible) => {
      const updatedDetailsVisible = [...prevDetailsVisible];
      updatedDetailsVisible[index] = !prevDetailsVisible[index];
      return updatedDetailsVisible;
    });
  };

  const deleteReq = (userId) => {
    let ans = window.confirm('Do you want to Delete?');
    if (ans) {
      const url = `http://localhost:8500/admin/deletedev/${userId}`;
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
      <Row>
        <Col>
          {developers.map((ls) => (
            <Button variant="primary" onClick={() => setExp(ls.expertise)} key={ls._id}>{ls.expertise}</Button>
          ))}
        </Col>
      </Row>
      {developers.length > 0 ? (
        <Row>
          {developers
            .filter((ls) => ls.expertise === exp)
            .map((developer, index) => (
              <Col xs={12} md={6} lg={4} key={developer.id} className='rounded shadow p-2 border mt-3'>
                <Card style={{ width: '18rem' }}>
                  <CardImg variant="top" src={`http://localhost:8500/${developer.imageUrl}`} alt={developer.fullname} style={{ width: '100%', height: '150px' }} />
                  <CardBody>
                    <CardTitle>{developer.fullname}</CardTitle>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem><strong>Expertise:</strong> {developer.expertise}</ListGroupItem>
                    </ListGroup>
                    {!isDetailsVisible[index] && (
                      <Button variant="primary" size="sm" onClick={() => toggleDetails(index)}>
                        View More
                      </Button>
                    )}
                    {isDetailsVisible[index] && (
                      <>
                        <ListGroup>
                          <ListGroupItem>
                            <strong>Address:</strong> {developer.address}
                          </ListGroupItem>
                          <ListGroupItem>
                            <strong>Phone:</strong> {developer.phone}
                          </ListGroupItem>
                          <ListGroupItem>
                            <strong>Email:</strong> <a href={`mailto:${developer.email}`} style={{ textDecoration: 'none' }}>{developer.email}</a>
                          </ListGroupItem>
                        </ListGroup>
                        <br />
                        <Button variant="primary" size="sm" onClick={() => toggleDetails(index)} style={{ marginRight: '10px' }}>
                          View Less
                        </Button>
                        
                        <MdDelete
                          onClick={() => {
                            deleteReq(developer._id);
                          }}
                          style={{ color: 'black', fontSize: '20px', marginLeft: '10px' }}
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
    </Container>
  );
}
