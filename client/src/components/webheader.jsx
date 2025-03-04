import { useState } from 'react';
import free from './freelance.png'; // Update path if needed
import './webheader.css'; // Ensure that you have relevant styles for the new dropdowns

export default function Webheader() {
  const [dropmenu, setMenu] = useState(false); // State for the main menu dropdown
  const [toggle, setToggle] = useState(false); // State for the burger menu (mobile)
  const [loginMenu, setLoginMenu] = useState(false); // State for the login dropdown
  const [loginToggle, setLoginToggle] = useState(false); // State for login menu toggle

  // Main dropdown function for navigation
  function dropdown() {
    setMenu(!dropmenu);
  }

  // Login dropdown function
  function loginDropdown() {
    setLoginToggle(!loginToggle);
  }

  return (
    <>
      <div className="header">
        {/* Logo Section */}
        <div className="logo">
          <img src={free} alt="Freelancer Logo" />
          <h3>FreeLancer</h3>
        </div>

        {/* Navigation Links */}
        <div className="naves">
          <p><a href="/"><i className="fa-solid fa-house"></i>Home</a></p>
          <p><a href="#"><i className="fa-solid fa-gear"></i>About Us</a></p> 
           <p><a href="#"><i className="fa-duotone fa-id-badge"></i>Contact Us</a></p>
          {/* <p> <a href="/clientlogin"><i className="fa-solid fa-briefcase"></i>&nbsp;Client Login</a></p> */}
          <p> <a href="/login"><i className="fa-solid fa-user"></i>&nbsp;Login</a></p>
        </div>

        {/* Social Icons */}
        <div className="social">
          <p><a href="#"><i className="fa-brands fa-facebook"></i></a></p>
          <p><a href="#"><i className="fa-brands fa-linkedin"></i></a></p>
        </div>

        {/* Burger Menu for Mobile */}
        <div className="burger" onClick={dropdown}>
          <i className="fa-solid fa-list"></i>
        </div>
      </div>

      {/* Main Menu Dropdown */}
      <div className={`dropmove ${dropmenu ? 'active' : ''}`}>
        <p><a href="#"><i className="fa-solid fa-house"></i>&nbsp;Home</a></p>
        <p><a href="#"><i className="fa-solid fa-gear"></i>&nbsp;About Us</a></p>
        <p><a href="#"><i className="fa-duotone fa-id-badge"></i>&nbsp;Contact Us</a></p>

        {/* Login Dropdown */}
        <div className={`login-dropdown ${loginToggle ? 'active' : ''}`}>
          <a href="/login"><i className="fa-solid fa-user"></i>&nbsp;User Login</a>
          <a href="/clientlogin"><i className="fa-solid fa-briefcase"></i>&nbsp;Client Login</a>
        </div>
      </div>
    </>
  );
}
