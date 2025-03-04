import {Container,Row,Col,Button, Form} from 'react-bootstrap';
import AXIOS  from 'axios'
 import React from 'react'
import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
 export default function Categoryreg() {
    const nav=useNavigate()
    const [category,setCategory]=useState("")
    const handlerCategory=(e)=>{
        e.preventDefault()
        AXIOS.post("http://localhost:8000/category",{category})
        .then((res)=>{
            message.success(res.data)
            nav("/adminhome")
        })
        .catch((err)=>message.error(err))
    }
   return (
     <div>
       <Container>
        <Row>
            <Col>
            <Form onSubmit={handlerCategory}>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="category" onChange={(e)=>{setCategory(e.target.value)}} required/>
                    {category}
                </Form.Group>
                <Form.Group>
                    <Button type="submit">
                        create
                    </Button>
                </Form.Group>
            </Form>
            </Col>
        </Row>
       </Container>
     </div>
   )
 }
 