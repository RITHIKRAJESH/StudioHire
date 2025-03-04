import{useState,useEffect} from 'react';
import {Container,Row,Col,Form, Table, Button} from 'react-bootstrap'
import AXIOS from 'axios'
import './userreg.css';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
export default function Usersearch(){
    const [uname,setUname]=useState("");
    const [record,setRecord]=useState([]);

    useEffect(()=>{
        const url="http://localhost:8000/fetchAlluser"
     AXIOS.get(url).then((res)=>{
            setRecord(res.data)
        })
    })
    const deleteuser = (userId) => {
        // alert(userId + " deleted!");
        let ans=window.confirm("Do you want to Delete?")
        if (ans){
            const url =`http://localhost:8000/deleteusers/${userId}`;
            AXIOS.get(url).then((res)=>{
                window.location.reload();
                alert(res.data);
              })
        }else{
          alert('Deletion Cancelled')
        }
      };
    
    return(
        <>
        <Container>
            <Row>
                <Col>
                 <Form.Control type="text"
                 onChange={(e)=>setUname(e.target.value)}
                 
                 placeholder='search by name' required/> 

                 
                </Col>
            </Row>
            <Row>
                <Col>
            <Table>
                <thead>
                    <tr>
         <th>slno</th> <th>Name</th> <th>Email</th> <th>Phone</th><th>Action</th>
                    </tr>
                </thead>
              <tbody>
                { 
                 uname!=""?
                 record
                 .filter(ls => ls.fullname && ls.fullname.match(uname))
                 .map((ls,index) => {
                     return(
                         <tr key={ls._id}>
                             <td>{index+1}</td>
                             <td>{ls.fullname}</td>
                             <td>{ls.email}</td>
                             <td>{ls.phone}</td>
                             <td>
                                 <MdDelete
                                     onClick={() => {
                                         deleteuser(ls._id);
                                     }}
                                     style={{ color: "black", fontSize: "35px" }}
                                 />
                             </td>
                             &nbsp;
                             <td>
                        <a href={`/usersearch/empedit/${ls._id}`}>
                            <FaUserEdit style={{color:'green',fontSize:'35px'}} />
                        </a>
                    </td>
                         </tr>
                     );
                 })
             
                    :
                    record
                    .map((ls,index)=>{
                        return(
                            <tr key={ls._id}>
                                <td>
                                    {index+1}
                                </td>
                                <td>
                                    {ls.fullname}
                                </td>
                                <td>
                                    {ls.email}
                                </td>
                                <td>
                                    {ls.phone}
                                </td>
                            </tr>
                        )

                    })
                }
              </tbody>


            </Table>

            </Col>
            </Row>
        </Container>
        
        </>
    )
}