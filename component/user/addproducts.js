import React from 'react'
import { Button, Container, Form, Row ,Col} from 'react-bootstrap'
import { useState } from 'react'
import AXIOS from 'axios';
import Webheader from './webheader';
export default function Addproducte() {
    const [record,setRecord]=useState({})
  const formdata=new FormData()
    const setValue=(field,value)=>{ 
        setRecord({...record,[field]:value})

    }
    const handlersubmit=(e)=>{
        e.preventDefault();
        const url="http://localhost:8000/addproducts";
        formdata.append("image",record.image)
        formdata.append("productname",record.productname)
        AXIOS.post(url,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then(
            (res)=>{
                   alert(res.data)
            }
        )

    }
  return (
<>
 <Container>
    <Webheader/>
    <Row>
        <Col>
        <Form onSubmit={handlersubmit} encType='multipart/form-data'> 
        <Form.Group>

        <Form.Control type="file" name="image" onChange={(e)=>{
            setValue(e.target.name,e.target.files[0])
          }}/>

        </Form.Group>
        <Form.Group>

<Form.Control type="text" name="productname" onChange={(e)=>{
    setValue(e.target.name,e.target.value)
  }}/>
  
</Form.Group>
<Form.Group>
    <Button style={{backgroundColor:"pink"}} type="submit">
        upload
    </Button>
</Form.Group>
         

        </Form>
        </Col>
    </Row>

    <Row>
      <Col>
        {/* <img src={`http://localhost:9000/_1709978225784-276762893_cam.jpj.jpg`} height={500} width={800}/> */}
      </Col>
    </Row>
 </Container>
</>
  )
}