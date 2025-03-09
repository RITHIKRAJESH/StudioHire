// import React from 'react';
// import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
// import './ClientDashBoard.css'; // Optional: If you'd like to add custom styles
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Profile from './profile';
// import Viewfreelancers from './viewfreelancers';
// import ViewprojectClient from './viewprojectsclient';
// import Viewprojecthistory from './viewhistory';
// import Complaints from './complaints';

// export default function ClientDashBoard() {
//   // Handle logout functionality
//   const navigate=useNavigate()
//   const handleLogout = () => {
//     localStorage.clear(); 
//     alert("Logged out successfully!");
//     navigate("/")
//   };

//   return (
//     <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col md={2} className="sidebar">
//           <h3 className="text-center text-white">Client Dashboard</h3>
//           <Nav defaultActiveKey="/" className="flex-column">
//             <Nav.Link href="/client/viewfreelancers" className="text-white">View Freelancers</Nav.Link>
//             <Nav.Link href="/client/viewworks" className="text-white">Works</Nav.Link>
//             <Nav.Link href="/client/history" className="text-white">History</Nav.Link>
//             <Nav.Link href="/client/complaints" className="text-white">Complaints</Nav.Link>
//             <Nav.Link href="/client/profile" className="text-white">Profile</Nav.Link>
//             <Nav.Link href="#" className="text-danger" onClick={handleLogout}>Logout</Nav.Link>
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col md={10} className="main-content">
//           <h1>Welcome to your Dashboard!</h1>
//           <Routes>
//         <Route path="/" element={<Viewfreelancers/>}/>
//         <Route path="/profile" element={<Profile/>}/>
//         <Route path="/viewfreelancers" element={<Viewfreelancers/>}/>
//         <Route path="/viewworks" element={<ViewprojectClient/>}/>
//         <Route path="/history" element={<Viewprojecthistory/>}/>
//         <Route path="/complaints" element={<Complaints/>}/>
//       </Routes>
//         </Col>

//       </Row>
      
//     </Container>
//   );
// }
