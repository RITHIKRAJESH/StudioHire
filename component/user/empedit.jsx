import React, { useEffect } from 'react'
import { useState} from 'react'
import { Button, Col, Container,Form,Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import AXIOS from 'axios'

import {useNavigate} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//useRef 
import { useRef } from 'react'

export default function Useredit() {
    const nav=useNavigate();
    
      const params=useParams();
      const refitem=useRef();
    const idn=params.idno;
    
    const[record,setRecord]=useState({'userid':idn});
useEffect(()=>{



 const url=`http://localhost:8000/fetchByid/${idn}`;
 AXIOS.get(url)
 .then((res)=>{
  const datas=res.data;
  const form=refItem.current;
  form['fname'].value=datas[0].fullname;
  form['email'].value=datas[0].email;
  

 })
},[])
    
const setValue=(field,value)=>{
      setRecord({...record,[field]:value})
}

const updatehandler=(e)=>{
  e.preventDefault();
  const url="http://localhost:8000/updateData";

  AXIOS.post(url,record)
  .then((res)=>{
    alert(res.data)

  })
}
  return (
   <>
=    <Container>
  <Row>
    <Col>
    <Form ref={refitem} onSubmit={updatehandler}>
      <Form.Group>
        <Form.Label>Fullname</Form.Label>
        <Form.Control type="text" name="fname" onChange={(e)=>{
          setValue(e.target.name,e.target.value)
        }} required/>
      </Form.Group>
      <Form.Group>
        <Form.Label>email</Form.Label>
        <Form.Control type="text" name="email" onChange={(e)=>{
          setValue(e.target.name,e.target.value)
        }} required/>
      </Form.Group>

      <Form.Group>
        <Button type="submit">
          Update
        </Button>


      </Form.Group>
    </Form>
    
    </Col>
  </Row>
</Container>
   
   </>
  )
}
