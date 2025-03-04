//function components 

// import pic from '../images/pexels-vedran-miletić-2341566.jpg'
import{Container,Row,Col,Button,Form}  from 'react-bootstrap';
import { useState } from 'react';
import './signin.css';
import AXIOS from 'axios'
export default function Signin(){
    const [record,setRecord]=useState({email:"",password:""})
    const [errors,setErrors]=useState({});
    /*

     object 
     {fullname:"",email:"",phone:"",password:""}
     {...record,fullname}


    */

     //validation 
     const findErrors=()=>{
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const {email,password}=record;
        const newerrors={};
        if(!password||password==""){
            newerrors.password="password field is required";
        }
        else if(password.length>6){
            newerrors.password="content is too long";
        }

        if(!email||email===''){
            newerrors.email="email field is required!";
        }
        // else if(!re.test(email)){
        //         newerrors.email="invalid email";
        // }


        return newerrors;
     }
   const setValue=(field,value)=>{
         setRecord({...record,[field]:value})  
         //setRecord({..record,fullname:jose})
         if ( !!errors[field] ){ setErrors({
            ...errors, [field]: null
            })
        }
   }
   const handlerSubmit=(e)=>{
    e.preventDefault();
    const newErrors=findErrors();
    if(Object.keys(newErrors).length>0){
        setErrors(newErrors);
    }
    else{
        alert("thank you for register")

    }
    
   }

    return(
        <>
     
        <Container >
            <Row>
                <Col>
                {/* <a href="\" className='' */}
                </Col>
            </Row>
            <Row>
                <Col> 
            <h1 className='b'>Sign in</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                 <Form onSubmit={handlerSubmit} className='a'>
                 <Row className='border shadow justify-content-center p-5 mt-2 rounded'>
                    <Form.Group>
                    <Form.Label>
                     Username
                    </Form.Label>
    <Form.Control type="text" name="email" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} />
                    {record.fullname}

                    </Form.Group>

                    <Form.Group>
                    <Form.Label>
                       Password
                    </Form.Label>

    <Form.Control type="password" name="password" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} isInvalid={!!errors.password} />
                        
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                   <Form.Group as="Col" align="center">
                    <br></br>
                    <Button type="submit" className='btn-success' >
                        Submit
                    </Button>
                    <a  href="\" className='btn ' >Back to home</a>
                   </Form.Group>
</Row>
                 </Form>
                </Col>
            </Row>
        </Container>
    
        
        
        </>
        
    )
}