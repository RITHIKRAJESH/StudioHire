import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import {message} from 'antd'

export default function ViewDev() {
  const idn = sessionStorage.getItem('userid');
  const [category,setCategory]=useState([])
  const [exp, setExp] = useState(""); 
  const [developers, setDevelopers] = useState([]); 
  const [isDetailsVisible, setIsDetailsVisible] = useState(new Array(developers.length).fill(false)); 
  useEffect(()=>{
    axios.get("http://localhost:8000/category")
    .then((res)=>{
        setCategory(res.data)
    })
    .catch((err)=>{message.error(err)})
 },[])
  useEffect(() => {
    const url = `http://localhost:8000/fetchalldev`;
    axios.get(url)
      .then((response) => {
        setDevelopers(response.data);
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

  return (
    <Container>
      <center><br></br>
        <h1>MEET OUR TALENTED FREELANCERS</h1>
        <h5>Crafting Tomorrow's Solutions Today</h5>
      </center><br></br><br></br>
      {developers.length > 0 && (
        <Row>
          {developers.map((developer, index) => (
            <Col xs={12} md={6} lg={4} key={developer.id} className='rounded shadow p-2 border mt-3'>
              <Card style={{ width: '18rem' }}>
                <CardImg variant="top" src={`http://localhost:8000/${developer.imageUrl}`} alt={developer.fullname} style={{ width: '100%', height: '150px' }} />
                <CardBody>
                  <CardTitle>{developer.fullname}</CardTitle>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><strong>EXPERTISE:</strong> {developer.expertise}</ListGroupItem>
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
                      <Button variant="primary" size="sm" onClick={() => toggleDetails(index)} style={{ marginRight: '90px' }}>
                        View Less
                      </Button>
                      <a href={`/clienthome/clientagree/${developer._id}`} style={{ color: 'white', textDecoration: 'none' }} className="btn btn-primary">Assign</a>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {!developers.length && (
        <p>No freelancers found.</p>
      )}
    </Container>
  );
}
