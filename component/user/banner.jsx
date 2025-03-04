import React from 'react';
import '../../App.css';
//import './Banner.css'; // Import CSS file for animation styles

export default function Banner({ title, content }) {
  return (
    <>
      <div className="banner-container">
        <span className='titlestyle animate__animated animate__fadeInUp' style={{ color: '#1E90FF', fontSize: '150px', textAlign: 'center',marginBottom:'30px' }}>{title}</span>
        <p style={{ textAlign: 'justify', color: '#191970' ,fontSize:'25px'}} className='pstyle animate__animated animate__fadeInUp'>
          {content}
        </p>
      </div>
    </>
  );
}
