// IntruderPage.js
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const IntruderPage = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Unauthorized Access</h1>
      <p>You are not authorized to view this page.</p>
      <Button type="primary" onClick={() => navigate('/login')}>
        Go to Login
      </Button>
    </div>
  );
}

export default IntruderPage;
