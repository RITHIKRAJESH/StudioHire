import { Container, Row, Col, Nav } from "react-bootstrap";
import Empheader from "./emphead";
import Profile from "./profile";
import Employeeview from "./employeeview";
import { Route, Routes } from "react-router-dom";
import './emppage.css'
import Devexp from "./devexp";
import Exprofile from "./exprofile";

export default function Emppage() {
    return (
        <>
            <Empheader />
            <Container fluid>
                <Row>
                    <Col lg={2}>
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <div className="nav-box">
                                <Nav.Link href="/emp">Home</Nav.Link >
                            </div>
                            <div className="nav-box">
                                <Nav.Link href="/emppage/profile">Profile</Nav.Link>
                            </div>
                            
                          
                            <div className="nav-box">
                                <Nav.Link href="/">Logout</Nav.Link>
                            </div>
                        </Nav>
                    </Col>
                    <Col lg={10}>
                        <Routes>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/exprofile" element={<Exprofile/>}/>
                            <Route path="/employeeview" element={<Employeeview />} />
                             {/* <Route path="/empedit/:id" element={<Empedit />} />  */}
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </>
    )
}