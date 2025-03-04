import { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you're using lowercase 'axios'
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { CiDesktopMouse2 } from 'react-icons/ci';

export default function ViewCli() {
  const idn = sessionStorage.getItem('userid');
  const [developers, setDevelopers] = useState([]); // Use plural for clarity
  const [isDetailsVisible, setIsDetailsVisible] = useState(new Array(developers.length).fill(false)); // Track visibility for each developer
  const [cid,setCid]=useState([])
  useEffect(() => {
    axios.get(`http://localhost:8000/clientagreeid/${idn}`)
      .then((res) => {
        let fda=res.data;
        const gh=fda[0]
        setCid(res.data)
        console.log(gh)
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const url = `http://localhost:8000/fetchallcli`;
    axios.get(url)
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching developers:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      });
  }, []);

  const toggleDetails = (index) => {
    setIsDetailsVisible((prevDetailsVisible) => {
      const updatedDetailsVisible = [...prevDetailsVisible];
      updatedDetailsVisible[index] = !prevDetailsVisible[index];
      return updatedDetailsVisible;
    });
  };
  return (
    <Container>
      <center>
        <h1>MEET OUR CLIENT</h1>
        <h5>Crafting Tomorrow's Solutions Today</h5>
      </center>
      {developers.length > 0 ? (
        <Row>
          {cid.map((ag) => {
            return (
              developers
                .filter((ls) => ls._id.match(ag.userid._id))
                .map((developer, index) => (
                  <Col xs={12} md={6} lg={4} key={developer.id} className='rounded shadow p-2 border mt-3'>
                    <Card style={{ width: '18rem' }}>
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
                          </>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                ))
            );
          })}
        </Row>
      ) : (
        <p>No developers found.</p>
      )}
    </Container>
  );
}
