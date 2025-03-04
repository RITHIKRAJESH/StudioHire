import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './emphead.css';
import './logo.jpg'

export default function Empheader() {
  const username = sessionStorage.getItem("username");

  return (
    <>
      <Navbar className="custom-navbar">
        <Container fluid>
          <Navbar.Brand href="#home" className='nv'>
            {/* <img
              alt=""
              src="/logo.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} */}
            <b>FREELANCER-PROJECT-COMPLETOR</b>
          </Navbar.Brand>
          <div className="welcome-text">
            <h4 className='nm'>WELCOME {username}</h4>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
