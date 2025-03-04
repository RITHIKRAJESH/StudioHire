import React from 'react'
import { useState } from 'react';
import AXIOS from 'axios';
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import backgroundImage from './sig.jpg'; 
//const [image, setImage] = useState("");
export default function Adminlogin() {
    const nav=useNavigate();
    const [record, setRecord] = useState({email:"",password:""});
const [errors, setErrors] = useState({});
const formData = new FormData();

const setValue = (field, value) => {
    setRecord({ ...record, [field]: value });
    if (!!errors[field]) setErrors({ ...errors, [field]: null });
};

const handlerSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        const url = "http://localhost:8000/adminlogin";
      AXIOS.post(url,record).then((response) => {
            if (response.data.status === 1) {
                sessionStorage.setItem("userid",response.data.userid)
               
            
               
                nav("/adminhome")//navigate tha page
                //alert(response.data.msg);
            } else {
                alert(response.data.msg);
            }
        });
        
    }
};
//client login





const findErrors = () => {
   // const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const {  email,password} = record;
    const newErrors = {};

   
    if (!password || password === '') {
        newErrors.password = 'cannot be blank!';
    } else if (password.length < 6) {
        newErrors.password = 'must assign a password more than 6 digits!';
    }

    

    return newErrors;
}

  return (
    <>
    <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <Container >
        <center><h3 className='head'><b>Login to your account</b></h3></center>
    <Form onSubmit={handlerSubmit} className='sg'>
        <Row className='border shadow justify-content-center p-5 mt-2 rounded' > 
        
        <Form.Group as="Col">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' autoComplete="off" name='email' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
  
            
  <Form.Group as="Col">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.password} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
  
                        

        <Form.Group className='mt-5' align='left'>
            <Button type="submit" variant="secondary" >Login</Button>
        </Form.Group>
        <Col className='text-center p-3 d-flex justify-content-end'>
      {/* Your additional button with a link */}
      <a href="/" className="btn btn-secondary">Back To Home </a>
    </Col>        
    
        </Row>
    </Form>
    
    </Container>
  
      </div>
  
    </>
  )
}