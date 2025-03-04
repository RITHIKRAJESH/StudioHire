// import { Container, Row,Col } from "react-bootstrap";
// import React from 'react';
// export default function Footer(){
//     return(
//         <>
//      <div className="container mx-auto text-center">
//         <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
//       </div>
//       <div className="container mx-auto flex flex-wrap justify-between items-center">
       
//         <div className="w-full md:w-1/2 text-center md:text-right">
//           <ul className="inline-flex list-none">
//             <li className="mr-6">
//               <a href="/about" className="text-sm text-gray-300 hover:text-white">About</a>
//             </li>
//             <li className="mr-6">
//               <a href="/services" className="text-sm text-gray-300 hover:text-white">Services</a>
//             </li>
//             <li className="mr-6">
//               <a href="/contact" className="text-sm text-gray-300 hover:text-white">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
    
//         </>
//     )
// }
import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons'; // Import specific icons from Ant Design
import './Footer.css'; // Import your custom CSS file for styling

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3>Address</h3>
            <p>1234 Main Street</p>
            <p>City, State ZIP</p>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +123-456-7890</p>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3>Social Media</h3>
            <p>
              <a href="#">
                <FacebookOutlined />
              </a>
              <a href="#">
                <TwitterOutlined />
              </a>
              <a href="#">
                <InstagramOutlined />
              </a>
            </p>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterComponent;
