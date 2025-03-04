import {useEffect,useState} from 'react';
import AXIOS from 'axios';
import { Container, Row, Table ,Col} from 'react-bootstrap';
export default function Profile(){
    const idn=sessionStorage.getItem('userid')
    const [record,setRecord]=useState([])
    useEffect(()=>{
        const url=`http://localhost:8000/fetchByid/${idn}`;
        AXIOS.get(url).then((res)=>{
                setRecord(res.data)
        })
    })

    return(
        <>
        <Container>
           
               {
  record.map((ls)=>{

    return(

        <Row className='rounded shadow p-4 border mt-3'>
   <Col lg={2}>
           <img src={`http://localhost:8000/${ls.imageUrl}`} className='rounded-circle bg-info' style={{width:'100%'
        ,height:'200px'   
        }}/>
        </Col>
        <Col lg={10} >
            <h4>Name:   {ls.fullname}</h4>
            <h4>Address:    {ls.address}</h4>
            <h4>Phone:  {ls.phone}</h4>
           <h4 className='ma'>Email:<a href="">    {ls.email}</a></h4>
           <h4>Expertise:   {ls.expertise}</h4>
            
        </Col>
        </Row>
     
       
    )

  })

               }
                
           
        </Container>
        
        </>
    )
    
}