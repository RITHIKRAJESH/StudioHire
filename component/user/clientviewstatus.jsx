import { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import AXIOS from "axios";

export default function Viewstatus() {
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

  let userId = sessionStorage.getItem("userid");
  console.log("Logged-in User ID:", userId);

  // Filtering records based on the logged-in user's ID
  const filteredData = record.filter((item) => item.userid && item.userid === userId);
  console.log(filteredData)
  return (
    <Container>
      <center>
        <h2>Client Insights: A Closer Look at Her Project</h2>
        <br />
      </center>
      <br />
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Developer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((ls) => (
                <tr key={ls._id}>
                  <td>{ls.pname}</td>
                  <td>{ls.cname}</td>
                  <td>{ls.devid.fullname}</td>
                  <td>{ls.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
