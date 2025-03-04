// import Empheader from './emphead'
// import Profile from './profile'
// import { Container, Row, Col, Nav } from "react-bootstrap";
// import { Route, Routes } from "react-router-dom";
// import Employeeview from "./employeeview";
// //import './emppage.css';
// import './emp.css';
// import Devexp from './devexp';
// import Exprofile from './exprofile';
// import ViewCli from './viewclient';
// import ViewAgree from '../admin/viewagree';
// import Feedback from './clifeedbk';
// import Complaint from './clicmp';

// export default function Msg() {
    
//     const userid = sessionStorage.getItem("userid")
//     const username = sessionStorage.getItem("username")
//     const phone = sessionStorage.getItem("phone")
//     const address = sessionStorage.getItem("address")

//     return (
//         <>
//             <Empheader /> 
            
//             <Container fluid className="main-container">
            
//                 <Row>
//                     <Col lg={2}>
                       
//                         <Nav defaultActiveKey="/home" className="flex-column"><br></br>
//                             <Nav.Link href="/emp" style={{ color: 'white' }}>Home</Nav.Link>
//                             <Nav.Link href="/emp/profile"style={{ color: 'white' }}>profile</Nav.Link>
//                             <Nav.Link href="/emp/devexp"style={{ color: 'white' }}>Add Experience</Nav.Link>
//                             <Nav.Link href="/emp/exprofile"style={{ color: 'white' }}>View Experience</Nav.Link>
//                             {/* <Nav.Link href="/emp/viewclient"style={{ color: 'white' }}>View Client</Nav.Link> */}
//                             {/* <Nav.Link href="/emppage/add-feedback"style={{ color: 'white' }}>Make Agreement</Nav.Link> */}
//                             <Nav.Link href="/emp/viewagree"style={{ color: 'white' }}>View Project</Nav.Link>
//                             <Nav.Link href="/emp/viewagree"style={{ color: 'white' }}>Update Status</Nav.Link>
//                             <Nav.Link href="/emp/clifeedbk"style={{ color: 'white' }}>Add Feedback</Nav.Link>
//                             <Nav.Link href="/emp/clicmp"style={{ color: 'white' }}>Add Complaint</Nav.Link>
//                             <Nav.Link href="/" style={{ color: 'white' }} className='nav-link:hover'>Logout</Nav.Link>
                            
//                         </Nav>
//                     </Col>
//                     <Col lg={10}>
//                         <Routes>
//                             <Route path="/profile" element={<Profile />} />
//                             <Route path="/devexp" element={<Devexp />} />
//                             <Route path="/exprofile" element={<Exprofile/>}/>
//                             <Route path="/viewclient" element={<ViewCli/>}/>
//                             <Route path="/viewagree" element={<ViewAgree/>}/>
//                             <Route path="/clifeedbk" element={<Feedback/>}/>
//                              <Route path="/clicmp" element={<Complaint/>}/>
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
    IdcardOutlined,
    PlusOutlined,
    UnorderedListOutlined,
    FileSearchOutlined,
    CommentOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './profile';
import Employeeview from './employeeview';
import Devexp from './devexp';
import Exprofile from './exprofile';
import ViewCli from './viewclient';
import ViewAgree from '../admin/viewagree';
import Feedback from './clifeedbk';
import Complaint from './clicmp';

const { Header, Sider, Content } = Layout;

export default function Msg() {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const username = sessionStorage.getItem("username");
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}> 
            <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={setCollapsed} 
                breakpoint="md"
                style={{ backgroundColor: '#90EE90' }}
                hidden={window.innerWidth <= 768}
            >
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" style={{ backgroundColor: '#90EE90' }}>
                    <Menu.Item key="1" icon={<UserOutlined />} onClick={() => navigate('/emp/profile')}>
                        Profile
                    </Menu.Item>
                    <Menu.Item key="2" icon={<IdcardOutlined />} onClick={() => navigate('/emp/devexp')}>
                        Add Experience
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PlusOutlined />} onClick={() => navigate('/emp/exprofile')}>
                        View Experience
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UnorderedListOutlined />} onClick={() => navigate('/emp/viewclient')}>
                        View Client
                    </Menu.Item>
                    <Menu.Item key="5" icon={<FileSearchOutlined />} onClick={() => navigate('/emp/viewagree')}>
                        View Project
                    </Menu.Item>
                    <Menu.Item key="6" icon={<CommentOutlined />} onClick={() => navigate('/emp/clifeedbk')}>
                        Add Feedback
                    </Menu.Item>
                    <Menu.Item key="7" icon={<LogoutOutlined />} onClick={() => navigate('/') }>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: '0 16px', backgroundColor: '#90EE90', display: 'flex', alignItems: 'center' }}>
                    <Button type="text" icon={<MenuUnfoldOutlined />} onClick={toggleDrawer} style={{ marginRight: '16px' }} />
                    <h3 style={{ flexGrow: 1 }}>Welcome, {username}</h3>
                </Header>
                <Drawer
                    title="Menu"
                    placement="left"
                    closable
                    onClose={toggleDrawer}
                    visible={drawerVisible}
                    bodyStyle={{ padding: 0 }}
                >
                    <Menu theme="light" mode="inline" style={{ backgroundColor: '#fff' }}>
                        <Menu.Item key="1" icon={<UserOutlined />} onClick={() => { navigate('/emp/profile'); toggleDrawer(); }}>
                            Profile
                        </Menu.Item>
                        <Menu.Item key="2" icon={<IdcardOutlined />} onClick={() => { navigate('/emp/devexp'); toggleDrawer(); }}>
                            Add Experience
                        </Menu.Item>
                        <Menu.Item key="3" icon={<PlusOutlined />} onClick={() => { navigate('/emp/exprofile'); toggleDrawer(); }}>
                            View Experience
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UnorderedListOutlined />} onClick={() => { navigate('/emp/viewclient'); toggleDrawer(); }}>
                            View Client
                        </Menu.Item>
                        <Menu.Item key="5" icon={<FileSearchOutlined />} onClick={() => { navigate('/emp/viewagree'); toggleDrawer(); }}>
                            View Project
                        </Menu.Item>
                        <Menu.Item key="6" icon={<CommentOutlined />} onClick={() => { navigate('/emp/clifeedbk'); toggleDrawer(); }}>
                            Add Feedback
                        </Menu.Item>
                        <Menu.Item key="7" icon={<LogoutOutlined />} onClick={() => { navigate('/'); toggleDrawer(); }}>
                            Logout
                        </Menu.Item>
                    </Menu>
                </Drawer>
                <Content style={{ margin: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 'calc(100vh - 112px)' }}>
                        <Routes>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/devexp" element={<Devexp />} />
                            <Route path="/exprofile" element={<Exprofile />} />
                            <Route path="/viewclient" element={<ViewCli />} />
                            <Route path="/viewagree" element={<ViewAgree />} />
                            <Route path="/clifeedbk" element={<Feedback />} />
                            <Route path="/clicmp" element={<Complaint />} />
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
