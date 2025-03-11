import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Drawer, message } from 'antd';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  ProjectOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HistoryOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import Adminviewfreelancers from './Adminviewfreelancers';
import Adminviewclients from './Adminviewclients';
import Viewproject from './Viewproject';
import ViewComplaint from './viewcomplaint';
import Profile from './profile';
import Viewfreelancers from './viewfreelancers';
import ViewprojectClient from './viewprojectsclient';
import Viewprojecthistory from './viewhistory';
import './Adminhome.css';
import AddEquipments from './addEquipments';
import EquipmentBooking from './equipmentbooking';
import IntruderPage from './IntruderPage'; // Assuming you have a component for the intruder page.

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // New state for authentication status
  const navigate = useNavigate();

  // Check for token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false); // Set authentication to false if no token
      navigate('/intruder'); // Redirect to intruder page
    }
  }, [navigate]);

  // Logout function to clear session and localStorage
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear(); // Clear session storage as well
    message.success('Logged out successfully!');
    navigate('/'); // Redirect to login page
  };

  if (!isAuthenticated) {
    return <IntruderPage />; // Render the IntruderPage component if not authenticated
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="md" className="custom-sider">
        <Menu mode="inline" defaultSelectedKeys={['1']} theme="dark">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/adminhome">Home</Link>
          </Menu.Item>
          
          <Menu.SubMenu key="projects" icon={<ProjectOutlined />} title="Projects">
            <Menu.Item key="3">
              <Link to="/adminhome/adminaddproject">Add Projects</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/adminhome/adminviewproject">View Projects</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/adminhome/history">Project History</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/adminhome/adminviewfreelancer">View Freelancers</Link>
          </Menu.Item>

          <Menu.Item key="5" icon={<PlusOutlined />}>
            <Link to="/adminhome/complaints">Feedbacks</Link>
          </Menu.Item>

          <Menu.SubMenu key="equipment" icon={<ProjectOutlined />} title="Equipment">
            <Menu.Item key="7">
              <Link to="/adminhome/addequipment">Add Equipment</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/adminhome/equipmentbooking">Equipment Booking</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="logout" icon={<LogoutOutlined />} className="logout-btn" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout className="site-layout">
        <Header className="custom-header">
          <Button type="text" icon={<MenuUnfoldOutlined />} onClick={() => setDrawerVisible(true)} className="mobile-menu-btn" />
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} className="desktop-menu-btn" />
          <Title level={3} className="header-title">Admin Panel</Title>
        </Header>

        {/* Mobile Drawer Menu */}
        <Drawer title="Menu" placement="left" closable onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
          <Menu mode="inline" defaultSelectedKeys={['1']} theme="dark">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/adminhome">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/adminhome/adminviewfreelancer">View Freelancers</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ProjectOutlined />}>
              <Link to="/adminhome/adminaddproject">Add Projects</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ProjectOutlined />}>
              <Link to="/adminhome/adminviewproject">View Projects</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<PlusOutlined />}>
              <Link to="/adminhome/complaints">Feedbacks</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<HistoryOutlined />}>
              <Link to="/adminhome/history">Project History</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<ProjectOutlined />}>
              <Link to="/adminhome/addequipment">Add Equipment</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<ProjectOutlined />}>
              <Link to="/adminhome/equipmentbooking">Equipment Booking</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} className="logout-btn" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* Page Content */}
        <Content className="custom-content">
          <Routes>
            <Route path="/" element={<Adminviewfreelancers />} />
            <Route path="/adminviewfreelancer" element={<Adminviewfreelancers />} />
            <Route path="/adminaddproject" element={<Viewproject />} />
            <Route path="/adminviewproject" element={<ViewprojectClient />} />
            <Route path="/complaints" element={<ViewComplaint />} />
            <Route path="/history" element={<Viewprojecthistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addequipment" element={<AddEquipments />} />
            <Route path="/equipmentbooking" element={<EquipmentBooking />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminDashboard;
