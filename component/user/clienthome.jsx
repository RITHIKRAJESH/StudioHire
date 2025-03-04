// import Clientheader from './clientheader';
// import { Container, Row, Col, Nav } from "react-bootstrap";
// import { Route, Routes } from "react-router-dom";
// import Clientlogin from './clientlogin';
// import Empheader from './emphead';
// import Clientprofile from './clientprofile';
// import Clientrequirement from './clientrequirement';
// import Clientreqview from './clientreqview';
// import Viewdev from './viewdev';
// import ClientAgree from './clientagree';
// import ViewAgree from '../admin/viewagree';
// import Viewstatus from './clientviewstatus';
// import Pay from './pay';
// import Feedback from './clifeedbk';
// import Complaint from './clicmp';
// import './clienthome.css'
// export default function Clienthome() {
    
//     const userid = sessionStorage.getItem("userid")
//     const username = sessionStorage.getItem("username")
//     const phone = sessionStorage.getItem("phone")
//     const address = sessionStorage.getItem("address")

//     return (
//         <>
//             <Clientheader /> 
            
//             <Container fluid className="main-container">
            
//                 <Row>
//                     <Col lg={2}>
                       
//                     <Nav defaultActiveKey="/home" className="flex-column"><br></br><br></br>
//                             <Nav.Link href="/clienthome" style={{ color: 'white' }}>Home</Nav.Link>
//                             <Nav.Link href="/clienthome/clientprofile"style={{ color: 'white' }}>profile</Nav.Link>
//                             {/* <Nav.Link href="/clienthome/clientrequirement"style={{ color: 'white' }}>Add Requirement</Nav.Link>
//                             <Nav.Link href="/clienthome/clientreqview"style={{ color: 'white' }}>View Requirement</Nav.Link> */}
//                             <Nav.Link href="/clienthome/viewdev"style={{ color: 'white' }}>View Developer</Nav.Link>
//                             <Nav.Link href="/clienthome/pay"style={{ color: 'white' }}>Make pay</Nav.Link>
//                             <Nav.Link href="/clienthome/clientviewstatus"style={{ color: 'white' }}>View Project</Nav.Link>
//                             <Nav.Link href="/clienthome/clicmp"style={{ color: 'white' }}>Add Complaint</Nav.Link>
//                             <Nav.Link href="/clienthome/clifeedbk"style={{ color: 'white' }}>Add Feedback</Nav.Link>
//                             {/* <Nav.Link href="/emppage/view-project"style={{ color: 'white' }}>View Project</Nav.Link>
//                             <Nav.Link href="/emppage/update-status"style={{ color: 'white' }}>Update Status</Nav.Link>
//                             <Nav.Link href="/emppage/add-feedback"style={{ color: 'white' }}>Add Feedback</Nav.Link> */}
//                             <Nav.Link href="/" style={{ color: 'white' }}>Logout</Nav.Link>
                            
                            
//                         </Nav>
//                     </Col>
//                     <Col lg={10}>
//                         {/* <ViewAgree/> */}
//                         <Routes>
//                             <Route path="/clientprofile" element={<Clientprofile />} />
//                             {/* <Route path="/clientrequirement" element={<Clientrequirement />} />
//                             <Route path="/clientreqview" element={<Clientreqview/>}/> */}
//                             <Route path="/viewdev" element={<Viewdev/>}/>
//                             <Route path="/clientagree/:devid" element={<ClientAgree/>}/>
//                             <Route path="/clientviewstatus" element={<Viewstatus/>}/>
//                             <Route path="/pay" element={<Pay/>}/>
//                             <Route path="/clifeedbk" element={<Feedback/>}/>
//                             <Route path="/clicmp" element={<Complaint/>}/>
//                         </Routes>
//                     </Col>
//                 </Row>
                
//             </Container>
//         </>
//     )
// }
import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import {
    UserOutlined,
    AppstoreOutlined,
    DollarOutlined,
    FileTextOutlined,
    MessageOutlined,
    CommentOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom';
import Clientheader from './clientheader';
import Clientprofile from './clientprofile';
import Viewdev from './viewdev';
import ClientAgree from './clientagree';
import Viewstatus from './clientviewstatus';
import Pay from './pay';
import Feedback from './clifeedbk';
import Complaint from './clicmp';

const { Header, Sider, Content } = Layout;

export default function Clienthome() {
    const username = sessionStorage.getItem("username");
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggle} style={{ backgroundColor: '#90EE90' }} className="d-none d-md-block">
                <div className="logo" />
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" style={{ backgroundColor: '#90EE90' }}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <a href="/clienthome/clientprofile">Profile</a>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreOutlined />}>
                        <a href="/clienthome/viewdev">View Freelancers</a>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DollarOutlined />}>
                        <a href="/clienthome/pay">Make Pay</a>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileTextOutlined />}>
                        <a href="/clienthome/clientviewstatus">View Project</a>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<MessageOutlined />}>
                        <a href="/clienthome/clifeedbk">Add Feedback</a>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<CommentOutlined />}>
                        <a href="/clienthome/clicmp">Add Complaint</a>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<LogoutOutlined />}>
                        <a href="/">Logout</a>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#90EE90', display: 'flex', alignItems: 'center' }}>
                    <Button type="text" icon={<MenuUnfoldOutlined />} onClick={() => setDrawerVisible(true)} className="d-block d-md-none" style={{ marginLeft: '16px' }} />
                    <h3 style={{ marginLeft: '16px' }}>Welcome, {username}</h3>
                </Header>
                <Drawer title="Menu" placement="left" closable={true} onClose={() => setDrawerVisible(false)} visible={drawerVisible} className="d-block d-md-none">
                    <Menu theme="light" mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <a href="/clienthome/clientprofile">Profile</a>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<AppstoreOutlined />}>
                            <a href="/clienthome/viewdev">View Workers</a>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DollarOutlined />}>
                            <a href="/clienthome/pay">Make Pay</a>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<FileTextOutlined />}>
                            <a href="/clienthome/clientviewstatus">View Project</a>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<MessageOutlined />}>
                            <a href="/clienthome/clifeedbk">Add Feedback</a>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<CommentOutlined />}>
                            <a href="/clienthome/clicmp">Add Complaint</a>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<LogoutOutlined />}>
                            <a href="/">Logout</a>
                        </Menu.Item>
                    </Menu>
                </Drawer>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Routes>
                            <Route path="/clientprofile" element={<Clientprofile />} />
                            <Route path="/viewdev" element={<Viewdev />} />
                            <Route path="/" element={<Viewdev />} />
                            <Route path="/clientagree/:devid" element={<ClientAgree />} />
                            <Route path="/clientviewstatus" element={<Viewstatus />} />
                            <Route path="/pay" element={<Pay />} />
                            <Route path="/clifeedbk" element={<Feedback />} />
                            <Route path="/clicmp" element={<Complaint />} />
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
