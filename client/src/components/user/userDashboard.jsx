import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Drawer } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import { HomeOutlined, UserOutlined, TeamOutlined, ProjectOutlined, PlusOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import './user.css'; 
import UserProfile from './profile';
import Viewprojects from './viewprojects';
import Payment from './payment';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function UserDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"
        className="custom-sider"
      >
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/user">Home</Link>
          </Menu.Item>
         
          <Menu.Item key="4" icon={<ProjectOutlined />}>
            <Link to="/user/viewproject">View Projects</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<PlusOutlined />}>
            <Link to="/user/payment">Payment</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ProfileOutlined />}>
            <Link to="/user/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />} className="logout-btn">
            <Link to="/">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="custom-header">
          <Button type="text" icon={<MenuUnfoldOutlined />} onClick={() => setDrawerVisible(true)} className="mobile-menu-btn" />
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} className="desktop-menu-btn" />
          <Title level={3} className="header-title">User Panel</Title>
        </Header>
        <Drawer title="Menu" placement="left" closable onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/user">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/user/viewfreelancer">View Employees</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ProjectOutlined />}>
              <Link to="/user/viewproject">View Projects</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<PlusOutlined />}>
              <Link to="/user/payment">Add Category</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<LogoutOutlined />} className="logout-btn">
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
        <Content className="custom-content">
          <Routes>
            <Route path="/" element={<Viewprojects/>}/>
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/viewproject" element={<Viewprojects/>} />
            <Route path="/payment" element={<Payment/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default UserDashboard;
