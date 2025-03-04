// import React from 'react'
// import { useState } from 'react';
// import AXIOS from 'axios';
// import {Container,Row,Col,Form,Button} from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
// import './clientlogin.css'
// import backgroundImage from './sig.jpg'; 
// //const [image, setImage] = useState("");
// export default function Clientlogin() {
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
//         const url = "http://localhost:8000/clientlogin";
//       AXIOS.post(url,record).then((response) => {
//             if (response.data.status === 1) {
//                 sessionStorage.setItem("userid",response.data.userid)
//                 sessionStorage.setItem("username",response.data.username)//applictaion store value
//                 sessionStorage.setItem("phone",response.data.phone)
//                 sessionStorage.setItem("address",response.data.address)
//                 sessionStorage.setItem("feedback",response.data.feedback)
//                 sessionStorage.setItem("imageUrl",response.data.imageUrl)
//                 nav("/clienthome")//navigate tha page
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
//   <div  style={{ backgroundColor: `#20B2AA` }}>
//     <Container >
//         <center><h3 className='text-center h3 light'><b>Client Login </b></h3></center>
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';

const ClientLogin = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const setValue = (field, value) => {
    setRecord({ ...record, [field]: value });
    if (!!errors[field]) setErrors({ ...errors, [field]: null });
  };

  const findErrors = () => {
    const { email, password } = record;
    const newErrors = {};

    if (!email || email === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password || password === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/clientlogin', record);
      if (response.data.status === 1) {
        sessionStorage.setItem('userid', response.data.userid);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('phone', response.data.phone);
        sessionStorage.setItem('address', response.data.address);
        sessionStorage.setItem('feedback', response.data.feedback);
        sessionStorage.setItem('imageUrl', response.data.imageUrl);
        navigate('/clienthome');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" height="100vh">
      <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
        <Typography component="h1" variant="h5">
          Client Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={record.email}
            onChange={(e) => setValue(e.target.name, e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={record.password}
            onChange={(e) => setValue(e.target.name, e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/clientreg" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ClientLogin;