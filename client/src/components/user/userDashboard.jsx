import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Drawer, message } from 'antd';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  ProjectOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ProfileOutlined,
  PicRightOutlined,
  MoneyCollectFilled,
  UserOutlined
} from '@ant-design/icons';
import './user.css';
import UserProfile from './profile';
import Viewprojects from './viewprojects';
import Payment from './payment';
import AddWork from './addwork';
import ViewPhotos from './viewphotos';
import Complaints from './complaints';
import ViewEquipments from './viewequipments';
import ViewBooking from './viewBooking';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function UserDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  // Check if token is available in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Unauthorized access! Redirecting to login...');
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  // Logout function to clear session and localStorage
  const handleLogout = () => {
    localStorage.clear();  // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage
    message.success('Logged out successfully');
    navigate('/login'); // Redirect to login page
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sider for desktop */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"
        className="custom-sider"
        theme="dark"
      >
        <Menu mode="inline" defaultSelectedKeys={['1']} theme="dark">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/user">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/user/viewproject">View Projects</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PlusOutlined />}>
            <Link to="/user/addworks">Add Work</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<PicRightOutlined />}>
            <Link to="/user/viewworks">View Works</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<MoneyCollectFilled />}>
            <Link to="/user/payment">Payment</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<PicRightOutlined />}>
            <Link to="/user/viewequipments">Equipments</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<PicRightOutlined />}>
            <Link to="/user/viewbooking">View Bookings</Link>
          </Menu.Item> {/* Add ViewBooking here */}
          <Menu.Item key="7" icon={<ProfileOutlined />}>
            <Link to="/user/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<PicRightOutlined />}>
            <Link to="/user/addcomplaints">Feedback</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<LogoutOutlined />} className="logout-btn" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main content area */}
      <Layout className="site-layout">
        <Header className="custom-header">
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={() => setDrawerVisible(true)}
            className="mobile-menu-btn"
          />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="desktop-menu-btn"
          />
          <Title level={3} className="header-title">
            User Panel
          </Title>
        </Header>

        {/* Drawer for mobile view */}
        <Drawer
          title="Menu"
          placement="left"
          closable
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          <Menu mode="inline" defaultSelectedKeys={['1']} theme="light">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/user">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ProfileOutlined />}>
              <Link to="/user/viewfreelancer">View Employees</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ProjectOutlined />}>
              <Link to="/user/viewproject">View Projects</Link>
            </Menu.Item>
            {/* <Menu.Item key="9" icon={<PicRightOutlined />}>
              <Link to="/user/viewequipments">Equipments</Link>
            </Menu.Item> */}
            <Menu.Item key="5" icon={<MoneyCollectFilled />}>
              <Link to="/user/payment">Payment</Link>
            </Menu.Item>
            {/* <Menu.Item key="10" icon={<PicRightOutlined />}>
              <Link to="/user/viewbooking">View Bookings</Link>
            </Menu.Item> Add ViewBooking here */}
            <Menu.Item key="6" icon={<LogoutOutlined />} className="logout-btn" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* Content area */}
        <Content className="custom-content">
          <Routes>
            <Route path="/" element={<Viewprojects />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/viewproject" element={<Viewprojects />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/addworks" element={<AddWork />} />
            <Route path="/viewworks" element={<ViewPhotos />} />
            <Route path="/addcomplaints" element={<Complaints />} />
            {/* <Route path="/viewequipments" element={<ViewEquipments />} />
            <Route path="/viewbooking" element={<ViewBooking />} /> Add ViewBooking route here */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default UserDashboard;
