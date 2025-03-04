import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
//import WebHeader from "./webheader";
import AXIOS from "axios";
import './devexp.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";


export default function ClientAgree() {
  
  const params=useParams()
  const userid=sessionStorage.getItem('userid')
      console.log(params.devid)
  const nav=useNavigate();
  const [record, setRecord] = useState({userid:userid, devid:params.devid});
 const [errors, setErrors] = useState({});
 
  const formdata = new FormData();


  const findErrors = () => {
    
    const { pname,cname,dname,pdesc,} = record;
    const newErrors = {};


    if (!pname || pname === '') {
        newErrors.pname = 'cannot be blank!';
    } 
    if (!cname || cname === '') {
        newErrors.cname = 'cannot be blank!';
    } 
    if (!dname || dname === '') {
      newErrors.dname = 'cannot be blank!';
  } 
  if (!pdesc || pdesc === '') {
      newErrors.pdesc = 'cannot be blank!';
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
    
    alert("Thank you for your commitment and cooperation")
    // console.log("hi")
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
       // alert("else submit")
      const url = "http://localhost:8000/clientagree";

      formdata.append("pname", record.pname);
      formdata.append("cname", record.cname);
      formdata.append("dname", record.dname);
      formdata.append("deadline", record.deadline);
      formdata.append("pdesc", record.pdesc);
    
      formdata.append("userid", userid);


      AXIOS.post(url,record).then((response) => {
         //alert("Thank You for Registering");
        if (response.data.status === 1) {
          
          toast.success(response.data.msg)
          nav("/pay")
          //setTimeout(nav("/login"),6000);
          
        } else {
          toast.error(response.data.msg);
        }
      });
    }
  };
  //validation
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    if (selectedDate < today) {
      setError("The date cannot be in the past.");
    } else {
      setError("");
      setDeadline(selectedDate);
    }
  };

    return (
        <div>
            <Form onSubmit={handlerSubmit} className='fm' encType='multipart/form-data'>
                <Container className="ct">
                    <Row>
                        <Col>
                            <h1 className='hd'>Development Partnership Agreement</h1>
                         
                        </Col>
                    </Row>
                    <Row className='border shadow justify-content-center p-5 mt-2 rounded'>
              
              
                         <Form.Group as="Col">
                            <Form.Label>Project name</Form.Label>
                            <Form.Control type='text' name='pname'placeholder='Enter the type of project you want' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.pname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.pname}
                            </Form.Control.Feedback>                       
                            </Form.Group>
                            <Form.Group as="Col">
                            <Form.Label>Client name</Form.Label>
                            <Form.Control type='text' name='cname'placeholder='Enter  your name to deal with the freelancer' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.cname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.cname}
                            </Form.Control.Feedback>                       
                             </Form.Group>
                             <Form.Group as="Col">
                            <Form.Label>Freelancer name</Form.Label>
                            <Form.Control type='text' name='dname'placeholder='Enter the name of the freelancer' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.dname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.dname}
                            </Form.Control.Feedback>                        
                            </Form.Group>
                             <Form.Group as="Col">
      <Form.Label>Work Date</Form.Label>
      <Form.Control
        type="date"
        name="deadline"
        value={deadline}
        onChange={handleDateChange}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
                            <Form.Group as="Col">
                           <Form.Label>Work Descripton</Form.Label>
                           <Form.Control
                           as="textarea"
                          rows={3}
                           name="pdesc"
                           placeholder="Enter your requirements here"
                           onChange={(e) => setValue(e.target.name, e.target.value)}
                           isInvalid={!!errors.pdesc}
    />
    <Form.Control.Feedback type="invalid">
        {errors.pdesc}
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