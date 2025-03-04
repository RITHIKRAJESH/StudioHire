import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
//import WebHeader from "./webheader";
import AXIOS from "axios";
import './devexp.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";


export default function Devexp() {
  const nav=useNavigate();
  const [record, setRecord] = useState({ });
 const [errors, setErrors] = useState({});
  const [proof, setImage] = useState("");  
  const formdata = new FormData();


  const findErrors = () => {
    
    const { cname,expr,work,image} = record;
    const newErrors = {};


    if (!cname || cname === '') {
        newErrors.cname = 'cannot be blank!';
    } 
    if (!expr || expr === '') {
        newErrors.expr = 'cannot be blank!';
    } 
    if (!work || work === '') {
        newErrors.work = 'cannot be blank!';
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
      const url = "http://localhost:8000/devexp";

      formdata.append("cname", record.cname);
      formdata.append("expr", record.expr);
      formdata.append("work", record.work);
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
                            <h1 className='hd'>Add Your Experience Here</h1>
                            <h5 className='da'>Share Your Insight</h5>
                        </Col>
                    </Row>
                    <Row className='border shadow justify-content-center p-5 mt-2 rounded'>
                    <Form.Label>Experience-Cirtificate</Form.Label>
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
                            <Form.Label>Combany name</Form.Label>
                            <Form.Control type='text' name='cname'placeholder='Enter the combany name' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.fullname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.cname}
                            </Form.Control.Feedback>                        </Form.Group>
                        <Form.Group as="Col">
                            <Form.Label>Experience(Years)</Form.Label>
                            <Form.Control type='textarea' name='expr'placeholder='Enter your experience' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.fullname} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.expr}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as="Col">
    <Form.Label>Work</Form.Label>
    <Form.Control
        as="textarea"
        rows={3}
        name="work"
        placeholder="Enter your works"
        onChange={(e) => setValue(e.target.name, e.target.value)}
        isInvalid={!!errors.work}
    />
    <Form.Control.Feedback type="invalid">
        {errors.work}
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