import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
//import WebHeader from "./webheader";
import AXIOS from "axios";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";


export default function Adminregister() {
  const nav=useNavigate();
  const [record, setRecord] = useState({ });
  const [errors, setErrors] = useState({});
  const formdata = new FormData();


  const findErrors = () => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const { email,password,} = record;
    const newErrors = {};

 
  


    if (!email || email === '') {
        newErrors.email = 'email is required';
    } else if (!re.test(email)) {
        newErrors.email = 'email is invalid';
    }

 

    if (!password || password === '') {
        newErrors.password = 'cannot be blank!';
    } else if (password.length < 6) {
        newErrors.password = 'must assign a password more than 6 digits!';
    }

   

    return newErrors;
};

  const setValue = (field, value) => {
    setRecord({ ...record, [field]: value });
    // setRecord({ ...record, fullname:dalin });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const handlerSubmit = (e) => {
    //alert("Thank You For Registering")
    // console.log("hi")
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
        //alert("else submit")
      const url = "http://localhost:8000/adminreg";

     
    
      formdata.append("email", record.email);
     
      formdata.append("password", record.password);
      formdata.append("cpass", record.cpass);
   

      AXIOS.post(url,record).then((response) => {
         alert("Thank You for Registering");
        if (response.data.status === 1) {
          
          toast.success(response.data.msg)
          nav("/adminlogin")
          //setTimeout(nav("/login"),6000);
          
        } else {
          toast.error(response.data.msg);
        }
      });
    }
  };
  //validation

  const handleGoBack = () => {
    nav("/"); // Navigate to the home page
};
    return (
        <div>
             <div className="background-image">
            <Form onSubmit={handlerSubmit}  encType='multipart/form-data' className="for">
        
                <Container className="fm">
                <Row>
                        <Col>
                            <h1 className='hd'><b>APPLY ...!</b></h1>
                            <h5 className='da'>To join freelancer directory please fill in your profile</h5>
                        </Col>
                    </Row>
                    <Row className='border shadow justify-content-center p-5 mt-2 rounded'>
                    
             
              
                       

                        <Form.Group as="Col">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type='text' name='email'placeholder='Enter your email address (e.g., example@example.com)' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    
                          



                        
                      
                          
                  
                    

                        <Form.Group as="Col">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password'placeholder="Enter your password (at least 6 characters)" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.password} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                      

                        <Form.Group as="Col">
                            <br /><Button type='submit' variant='primary'>Submit</Button>
                        </Form.Group>
              
                    </Row>
                   
                </Container>
                <Row>
                        <Col className='text-center p-3 '>
                           <b className="lk">Already have an account? </b><a href="/login" className="lnk">Sign in</a>
                        </Col>
                    </Row>
            </Form>
            <ToastContainer position='bottom-center' theme='dark' />
            </div>
            <ToastContainer
            position='bottom-center'
            theme='dark'
            
            />
        </div>
    );
}