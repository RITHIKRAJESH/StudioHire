import { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import AXIOS from 'axios';

export default function ViewAgree() {
  const [record, setRecord] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    AXIOS.get("http://localhost:8000/clientagree/")
      .then((res) => {
        setRecord(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlersubmit = (e, agreeid) => {
    e.preventDefault();
    AXIOS.post(`http://localhost:8000/clientupdate/`, { cid: agreeid, status: status })
      .then((res) => {
        alert(res.data);
      });
  };

  return (
    <Container>
        <center><h2>Developer Insights: A Closer Look at Her Project</h2><br></br></center><br></br>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Client</th>
                <th>Project Name</th>
                <th>Developer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {record
              .filter((ls)=>{return ls.status!=="notaccepted"})
              .map((ls) => (
                <tr key={ls._id}>
                  <td>{ls.cname}</td>
                  <td>{ls.pname}</td>
                  <td>{ls.devid.fullname}</td>
                  <td>{ls.status}</td>
                  <td>
                    <form onSubmit={(e) => { handlersubmit(e, ls._id) }}>
                      <select name="status" onChange={(e) => setStatus(e.target.value)}>
                        <option>Select update</option>
                        <option value="accept">Accept</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button type="submit">Update</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
