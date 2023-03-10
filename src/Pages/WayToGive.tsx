import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllData } from "../Redux/authReducer";
import { AppDispatch } from "../Redux/store";

const inputType = {
  padding: "5px 12px",
  width: "100%",
};

const WayToGive = () => {
  const [list, setList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [date, setDate] = useState("");
  const [searchId, setSearchId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const getResponse = useSelector((state: any) => state?.auth);

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  useEffect(() => {
    if (getResponse.status === "succuss") {
      setList(getResponse?.getdata?.data);
    }
  }, [getResponse]);

  const filterRecord = () => {
    const filterd = list?.filter((element: any) => {
      var today = new Date(element.createdAt);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      var currentdate = yyyy + "-" + mm + "-" + dd;
      // if (searchName && !date && !searchId) {
      //   return element.name.toLowerCase().includes(searchName.toLowerCase());
      // } else if (date && !searchName && !searchId) {
      //   return element.createdAt.toLowerCase().includes(date.toLowerCase());
      // }else if (!date && !searchName && searchId) {
      //   return element.id.toLowerCase() === (searchId.toLowerCase());
      // }else if (!date && searchName && searchId) {
      //   return element.name.toLowerCase().includes(searchName.toLowerCase()) &&
      //          element.id.toLowerCase() === (searchId.toLowerCase());
      // }else if (date && !searchName && searchId) {
      //   return element.createdAt.toLowerCase().includes(date.toLowerCase()) &&
      //          element.id.toLowerCase() === (searchId.toLowerCase());
      // }else if (date && searchName && !searchId) {
      //   return element.createdAt.toLowerCase().includes(date.toLowerCase()) &&
      //          element.name.toLowerCase().includes(searchName.toLowerCase());
      // }else if (searchName && date && searchId) {
      //   return (
      //     element.name.toLowerCase().includes(searchName.toLowerCase()) &&
      //     element.id.toLowerCase().includes(searchId.toLowerCase()) &&
      //     currentdate.toLowerCase().includes(date.toLowerCase())
      //   );
      // } else {
      //   return false;
      // }
      var search_id = searchId != "" ? element.id.toLowerCase().indexOf(searchId.toLowerCase()) !== -1 : true;
      var search_name = searchName != "" ? element.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1 : true;
      var search_date = date != "" ? currentdate.toLowerCase().indexOf(date.toLowerCase()) !== -1 : true;
      return search_id && search_name && search_date ;
    });
    setList(filterd);
  };

  const reset = () => {
    setDate("");
    setSearchName("");
    setSearchId("");
    dispatch(getAllData());
  };
  return (
    <>
      <Container>
        <Row style={{ paddingBottom: "25px" }}>
          <Col md={4} style={{ textAlign: "left" }}>
            <h4>Patient Table</h4>
          </Col>
          <Col md={8} style={{ textAlign: "right" }}>
            <Row>
              <Col md={2}>
                <input
                  type="text"
                  name="name"
                  style={inputType}
                  placeholder="search by Name"
                  value={searchId}
                  autoComplete="off"
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <input
                  type="text"
                  name="name"
                  style={inputType}
                  placeholder="search by Name"
                  value={searchName}
                  autoComplete="off"
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <input
                  type="date"
                  name="date"
                  style={inputType}
                  placeholder="search by Date"
                  value={date}
                  autoComplete="off"
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button onClick={filterRecord}>filter</Button>
              </Col>
              <Col md={2}>
                <Button onClick={reset}>Reset</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {list?.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Full Name</th>
                  <th>createdAt</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item: any, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <img src={item.avatar} alt="images" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          <p style={{ color: "red" }}>!!!Oops Record Not Found.</p>
        )}
      </Container>
    </>
  );
};

export default WayToGive;
