import { useEffect,useState } from "react"
import AXIOS from 'axios'
import { Table } from "react-bootstrap";
export default function Productview(){
    const [product,setProduct]=useState([])
    useEffect(()=>{
        const url="http://localhost:8000/fetchAllpdt";
        AXIOS.get(url).then((res)=>{
            setProduct(res.data)
          

        })
    })
    return(
        <>
    
         <Table>
            <thead>
                <tr>
                    <th>#</th> 
                    <th>Name</th> 
                    <th>image</th> 
                   
                </tr>
            </thead>
            <tbody>
                {
                    product.map((ls)=>{
                       return <tr key={ls._id}>
                               <td>#</td>
                              <td>
                                {ls.productname}
                              </td>
                              <td>
                            <img src={`http://localhost:8000/${ls.imageUrl}`} className="rounded" 
                            />
                              </td>
                             
                       </tr>
                    })
                }
            </tbody>
        </Table>
        </>
    )
}