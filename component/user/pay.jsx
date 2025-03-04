import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
//import WebHeader from "./webheader";
import AXIOS from "axios";
import './devexp.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";


export default function Pay() {
  const nav=useNavigate();
  const [record, setRecord] = useState({ });
 const [errors, setErrors] = useState({});
//   const [proof, setImage] = useState("");  
  const formdata = new FormData();


  const findErrors = () => {
    
    const { fname,email,cno,cvc,proof} = record;
    const newErrors = {};


    if (!fname || fname === '') {
        newErrors.fname = 'cannot be blank!';
    } 
    if (!email || email === '') {
        newErrors.email = 'cannot be blank!';
    } 
    if (!cno || cno === '') {
        newErrors.cno = 'cannot be blank!';
    } else if (cno.length > 12) {
        newErrors.cno= 'must a valid card number!';
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
    const userid=sessionStorage.getItem('userid')
    alert("Payment Successfully")
    // console.log("hi")
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
       // alert("else submit")
      const url = "http://localhost:8000/clipay";

      formdata.append("fname", record.projecttype);
      formdata.append("email", record.email);
      formdata.append("cno", record.cno);
      formdata.append("cvc", record.cvc);
    //   formdata.append("proof", proof);
      formdata.append("userid", userid);


      AXIOS.post(url,record).then((response) => {
        // alert("Thank You for Registering");
        if (response.data.status === 1) {
          
          toast.success(response.data.msg)
          //nav("/login")
          //setTimeout(nav("/login"),6000);
          
        } else {
          toast.error(response.data.msg);
        }
      });
    }
  };
  //validation


    return (
        <div>
            <Form onSubmit={handlerSubmit} className='fm' encType='multipart/form-data'>
                <Container className="ct">
                    <Row>
                        <Col>
                            <h1 className='hd'>Payment Form</h1>
                            
                        </Col>
                    </Row>
                    <Row className='border shadow justify-content-center p-5 mt-2 rounded'>
                    {/* <Form.Label>Id-Proof</Form.Label>
              <Form.Group>
                <Form.Control
                  type="file"
                  name="proof"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  accept=".jpg,.png,.jpeg"
                />
              </Form.Group> */}
              
                         <Form.Group as="Col">
                            <Form.Label>Account</Form.Label>
                            <Form.Control type='text' name='fname'placeholder='Full name' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.fname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.fname}
                            </Form.Control.Feedback>                        </Form.Group>
                    
                            <Form.Group as="Col">
                            <Form.Label>E mail</Form.Label>
                            <Form.Control type='text' name='email'placeholder='Email Address' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>                        </Form.Group>
                            <h4>Payment Details</h4>
                            <Form.Group as="Col">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type='text' name='cno'placeholder='Full name' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.cno} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.cno}
                            </Form.Control.Feedback>                        </Form.Group>
                            <Form.Group as="Col">
                            <Form.Label>Card cvc</Form.Label>
                            <Form.Control type='date' name='cvc'placeholder='Full name' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.cvc} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.cvc}
                            </Form.Control.Feedback>                        </Form.Group>
                    

                        <Form.Group as="Col">
                            <br /><Button type='submit' variant='success'>Pay Now</Button>
                        </Form.Group>
                    </Row>
                   
                </Container>
            </Form>
            <ToastContainer
            position='bottom-center'
            theme='dark'
            
            />
        </div>
    );
}