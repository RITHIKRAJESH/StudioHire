import { useEffect,useState } from "react"
import AXIOS from 'axios'
import { Table } from "react-bootstrap";
import Productview from "./productview";
export default function Employeeview(){
    const[record,setRecord]=useState([]);
    useEffect(()=>{
        console.log("useeffect working")
        const url="http://localhost:8000/fetchAllemp";
        AXIOS.get(url).then((res)=>{
            console.log(res.data)
            setRecord(res.data)
            console.log("data reached")

        })
    },[])//useeffect end
    return(
        <>
      
    view
        <Table>
            
            <thead>
                <tr>
                    <th>#</th> 
                    <th>Name</th> 
                    <th>Email</th> 
                   
                </tr>
            </thead>
            <tbody>
                {
                    record.map((ls)=>{
                       return <tr key={ls._id}>
                               <td>#</td>
                              <td>
                                {ls.fullname}
                              </td>
                              <td>
                                {ls.email}
                              </td>
                             
                             
                       </tr>
                    })
                }
            </tbody>
        </Table>


        
        </>
    )
}