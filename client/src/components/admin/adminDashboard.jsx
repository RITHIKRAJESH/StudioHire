import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Drawer } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import { HomeOutlined, UserOutlined, TeamOutlined, ProjectOutlined, PlusOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import Adminviewfreelancers from './Adminviewfreelancers';
import Adminviewclients from './Adminviewclients'; // Corrected the import name
import Viewproject from './Viewproject';
import Categoryreg from './Categoryreg ';
import './Adminhome.css'; 
import ViewComplaint from './viewcomplaint';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function AdminDashboard() {
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
            <Link to="/adminhome">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/adminhome/adminviewfreelancer">View Freelancers</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="/adminhome/adminviewclient">View Clients</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ProjectOutlined />}>
            <Link to="/adminhome/adminviewproject">View Projects</Link>
          </Menu.Item>
          {/* <Menu.Item key="5" icon={<PlusOutlined />}>
            <Link to="/adminhome/categoryadd">Add Category</Link>
          </Menu.Item> */}
          <Menu.Item key="5" icon={<PlusOutlined />}>
            <Link to="/adminhome/complaints">Complaints</Link>
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
          <Title level={3} className="header-title">Admin Panel</Title>
        </Header>
        <Drawer title="Menu" placement="left" closable onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/adminhome">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/adminhome/adminviewfreelancer">View Employees</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="/adminhome/adminviewclient">View Clients</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ProjectOutlined />}>
              <Link to="/adminhome/adminviewproject">View Projects</Link>
            </Menu.Item>
            {/* <Menu.Item key="5" icon={<PlusOutlined />}>
              <Link to="/adminhome/categoryadd">Add Category</Link>
            </Menu.Item> */}
            <Menu.Item key="5" icon={<PlusOutlined />}>
              <Link to="/adminhome/complaints">Complaints</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<LogoutOutlined />} className="logout-btn">
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
        <Content className="custom-content">
          <Routes>
            <Route path="/" element={<Adminviewfreelancers/>}/>
            <Route path="/adminviewfreelancer" element={<Adminviewfreelancers />} />
            <Route path="/adminviewclient" element={<Adminviewclients />} />
            <Route path="/adminviewproject" element={<Viewproject />} />
            <Route path="/complaints" element={<ViewComplaint/>}/>
            {/* <Route path="/categoryadd" element={<Categoryreg />} /> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminDashboard;
