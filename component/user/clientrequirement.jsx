import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
//import WebHeader from "./webheader";
import AXIOS from "axios";
import './devexp.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";


export default function Clientrequirement() {
  const nav=useNavigate();
  const [record, setRecord] = useState({ });
 const [errors, setErrors] = useState({});
  const [proof, setImage] = useState("");  
  const formdata = new FormData();


  const findErrors = () => {
    
    const { projecttype,requirement,proof} = record;
    const newErrors = {};


    if (!projecttype || projecttype === '') {
        newErrors.projecttype = 'cannot be blank!';
    } 
    if (!requirement || requirement === '') {
        newErrors.requirement = 'cannot be blank!';
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
    alert("Thank you for subitting your experience")
    // console.log("hi")
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
       // alert("else submit")
      const url = "http://localhost:8000/clientreq";

      formdata.append("projecttype", record.projecttype);
      formdata.append("requirement", record.requirement);
     
      formdata.append("proof", proof);
      formdata.append("userid", userid);


      AXIOS.post(url,formdata,{'content-type':'multipart/form-data'}).then((response) => {
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
                            <h1 className='hd'>Add Your Requirement Here</h1>
                            <h5 className='da'>Share Your Insight</h5>
                        </Col>
                    </Row>
                    <Row className='border shadow justify-content-center p-5 mt-2 rounded'>
                    <Form.Label>Id-Proof</Form.Label>
              <Form.Group>
                <Form.Control
                  type="file"
                  name="proof"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  accept=".jpg,.png,.jpeg"
                />
              </Form.Group>
              
                         <Form.Group as="Col">
                            <Form.Label>Project Type</Form.Label>
                            <Form.Control type='text' name='projecttype'placeholder='Enter the type of project you want' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.projecttype} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.projecttype}
                            </Form.Control.Feedback>                        </Form.Group>
                    
                            <Form.Group as="Col">
    <Form.Label>Requirement</Form.Label>
    <Form.Control
        as="textarea"
        rows={3}
        name="requirement"
        placeholder="Enter your requirements"
        onChange={(e) => setValue(e.target.name, e.target.value)}
        isInvalid={!!errors.requirement}
    />
    <Form.Control.Feedback type="invalid">
        {errors.requirement}
    </Form.Control.Feedback>
</Form.Group>

                        <Form.Group as="Col">
                            <br /><Button type='submit' variant='success'>Save</Button>
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