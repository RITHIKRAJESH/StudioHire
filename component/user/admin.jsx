import React from 'react'
import {Container,Nav} from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
export default function Admin() {
  return (
        //<center><u><i><h3>WELCOME ADMIN</h3></i></u></center>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><i>WELCOME ADMIN</i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="\" >Home</Nav.Link>
            <Nav.Link href="admin">Verify-Client</Nav.Link>
            <Nav.Link href="signin">Verify-User</Nav.Link>
            <Nav.Link href="signin">View-Projects</Nav.Link>
            <Nav.Link href="signin">View-Transactions</Nav.Link>
            <Nav.Link href="signin">Agreement</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
    
  
  )
}