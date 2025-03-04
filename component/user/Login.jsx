// import React from 'react'
// import { useState } from 'react';
// import AXIOS from 'axios';
// import {Container,Row,Col,Form,Button} from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
// import './Login.css'
// import backgroundImage from './sig.jpg'; 
// //const [image, setImage] = useState("");
// export default function Login() {
//     const nav=useNavigate();
//     const [record, setRecord] = useState({email:"",password:""});
// const [errors, setErrors] = useState({});
// const formData = new FormData();

// const setValue = (field, value) => {
//     setRecord({ ...record, [field]: value });
//     if (!!errors[field]) setErrors({ ...errors, [field]: null });
// };

// const handlerSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = findErrors();
//     if (Object.keys(newErrors).length > 0) {
//         setErrors(newErrors);
//     } else {
//         const url = "http://localhost:8000/login";
//       AXIOS.post(url,record).then((response) => {
//             if (response.data.status === 1) {
//                 sessionStorage.setItem("userid",response.data.userid)
//                 sessionStorage.setItem("username",response.data.username)//applictaion store value
//                 sessionStorage.setItem("phone",response.data.phone)
//                 sessionStorage.setItem("address",response.data.address)
//                 sessionStorage.setItem("expertise",response.data.expertise)
            
//                 sessionStorage.setItem("imageUrl",response.data.imageUrl)
//                 nav("/emp")//navigate tha page
//                 //alert(response.data.msg);
//             } else {
//                 alert(response.data.msg);
//             }
//         });
        
//     }
// };
// //client login





// const findErrors = () => {
//    // const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     const {  email,password} = record;
//     const newErrors = {};

   
//     if (!password || password === '') {
//         newErrors.password = 'cannot be blank!';
//     } else if (password.length < 6) {
//         newErrors.password = 'must assign a password more than 6 digits!';
//     }

    

//     return newErrors;
// }

//   return (
//     <>
//     <div  style={{ backgroundColor: `#20B2AA` }}>
//     <Container >
//         <center><h3 className='head'><b>Login to your account</b></h3></center>
//     <Form onSubmit={handlerSubmit} className='sg'>
//         <Row  className='border shadow justify-content-center p-3 mt-1 rounded' style={{backgroundColor:'#F8F8FF',width:'50%' ,marginLeft:'auto',marginRight:'auto'}}> 
        
//         <Form.Group  as="Col" >
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control type='text' autoComplete="off" name='email' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.email} />
//                             <Form.Control.Feedback type='invalid'>
//                                 {errors.email}
//                             </Form.Control.Feedback>
//                         </Form.Group>
  
            
//   <Form.Group as="Col">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type='password' name='password' onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.password} />
//                             <Form.Control.Feedback type='invalid'>
//                                 {errors.password}
//                             </Form.Control.Feedback>
//                         </Form.Group>
  
                        

//         <Form.Group className='mt-5' align='left'>
//             <Button type="submit" variant="secondary" >Login</Button><br></br>
//             <Col className='text-center p-3 d-flex justify-content-end'>
//             <b>Don't have an account: </b><a href="/userreg" >Register Now...!</a>
//       <a href="/" className="btn btn-secondary">Back To Home </a>
//     </Col>
//         </Form.Group>       
    
//         </Row>
//     </Form>
 
//     </Container>
  
//       </div>
  
//     </>
//   )
// }




import React, { useState } from 'react';
import AXIOS from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion'; // Optional: for animation effects

export default function Login() {
    const nav = useNavigate();
    const [record, setRecord] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

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
            const url = "http://localhost:8000/login";
            AXIOS.post(url, record).then((response) => {
                if (response.data.status === 1) {
                    sessionStorage.setItem("userid", response.data.userid);
                    sessionStorage.setItem("username", response.data.username);
                    sessionStorage.setItem("phone", response.data.phone);
                    sessionStorage.setItem("address", response.data.address);
                    sessionStorage.setItem("expertise", response.data.expertise);
                    sessionStorage.setItem("imageUrl", response.data.imageUrl);
                    nav("/emp");
                } else {
                    alert(response.data.msg);
                }
            });
        }
    };

    const findErrors = () => {
        const { email, password } = record;
        const newErrors = {};
        if (!password || password === '') {
            newErrors.password = 'Password cannot be blank!';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be more than 6 characters!';
        }
        return newErrors;
    };

    return (
        <Box sx={{ backgroundColor: '#1da1f2', minHeight: '100vh', paddingTop: 10 }}>
            <Container maxWidth="sm">
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'white', marginBottom: 4 }}>
                        Login to your account
                    </Typography>
                </motion.div>

                <Box sx={{
                    backgroundColor: '#F8F8FF',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3
                }}>
                    <form onSubmit={handlerSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    autoComplete="off"
                                    name="email"
                                    value={record.email}
                                    onChange={(e) => setValue(e.target.name, e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    name="password"
                                    value={record.password}
                                    onChange={(e) => setValue(e.target.name, e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ padding: '10px 30px', fontSize: '1rem' }}
                                >
                                    Login
                                </Button>
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Don't have an account? <a href="/userreg">Register Now</a>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 1 }}>
                                <a href="/" className="btn btn-secondary">Back To Home</a>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}
