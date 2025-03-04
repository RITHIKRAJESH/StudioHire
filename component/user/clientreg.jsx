import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
//import WebHeader from "./webheader";
import AXIOS from "axios";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";


export default function Userregister() {
  const nav=useNavigate();
  const [record, setRecord] = useState({ });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState("");  
  const formdata = new FormData();


  const findErrors = () => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const { fullname, address,email, phone, password, cpass,} = record;
    const newErrors = {};

    if (!fullname || fullname === '') {
        newErrors.fullname = 'cannot be blank!';
    } else if (fullname.length > 30) {
        newErrors.fullname = 'name is too long!';
    }

    if (!address || address === '') {
        newErrors.address = 'cannot be blank!';
    } 

   
  


    if (!email || email === '') {
        newErrors.email = 'email is required';
    } else if (!re.test(email)) {
        newErrors.email = 'email is invalid';
    }

    if (!phone || phone === '') {
        newErrors.phone = 'cannot be blank!';
    } else if (phone.length !== 10) {
        newErrors.phone = 'must assign a phone number more than 10 digits!';
    }

 
    if (!password || password === '') {
        newErrors.password = 'cannot be blank!';
    } else if (password.length < 6) {
        newErrors.password = 'must assign a password more than 6 digits!';
    }

    if (!(password === cpass)) {
        newErrors.cpass = 'Password Missmatch';
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
    alert("submit")
    // console.log("hi")
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
        //alert("else submit")
      const url = "http://localhost:8000/clientreg";

      formdata.append("fullname", record.fullname);
    
      formdata.append("email", record.email);
      formdata.append("phone", record.phone);
      formdata.append("address", record.address);
      formdata.append("password", record.password);
      formdata.append("cpass", record.cpass);
    
      formdata.append("image", image);

      AXIOS.post(url,formdata,{'content-type':'multipart/form-data'}).then((response) => {
        // alert("Thank You for Registering");
        if (response.data.status === 1) {
          
          toast.success(response.data.msg)
          nav("/clientlogin")
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
             <div style={{backgroundColor:'#20B2AA'}}>
            <Form onSubmit={handlerSubmit}  encType='multipart/form-data'>
            <Row>
                        <Col>
                            <h1 className='hd'>APPLY TO WORK WITH US...!</h1><br></br>
                            <h5 className='da'>To join freelancer directory please fill in your profile</h5>
                        </Col>
                    </Row>
                <Container style={{backgroundColor:'#F8F8FF'}}>
                  
                    <Row className='border shadow justify-content-center p-5 mt-2 rounded'>
                    <Form.Label>Profile Photo</Form.Label>
              <Form.Group>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  accept=".jpg,.png,.jpeg"
                />
              </Form.Group>
              
                         <Form.Group as="Col"  >
                            <Form.Label>Full name</Form.Label>
                            <Form.Control type='text' name='fullname'placeholder='Enter your full name' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.fullname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.fullname}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as="Col">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='textarea' name='address'placeholder='Enter your address' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.fullname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as="Col">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type='text' name='email'placeholder='Enter your email address (e.g., example@example.com)' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    
                          

                          <Form.Group as="Col">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" name='phone' placeholder="Enter your phone number (digits only)"onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.phone} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group> 

                        

                        
                      
                          
                  
                    

                        <Form.Group as="Col">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password'placeholder="Enter your password (at least 6 characters)" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.password} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as='Col'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="cpass" placeholder="Confirm your password" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.cpass} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.cpass}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as="Col">
                            <br /><Button type='submit' variant='success'>Submit</Button>
                        </Form.Group>
              
                    </Row>
                   
                </Container>
                <Row>
                        <Col className='text-center p-3 '>
                           <b className="lk">Already have an account? </b><a href="/clientlogin" className="lnk">Sign in</a>
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