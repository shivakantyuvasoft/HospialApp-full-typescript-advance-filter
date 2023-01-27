import React from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Appointment = () => {
  const resp = useSelector((state: any) => state?.auth?.appoinment);
  console.log(resp)
  return (
    <>
      <p>Appointment section</p>
      <Container>
        {resp ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>SirName</th>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Problem</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {resp?.map((item: any, index: any) => {
                  return (
                    <tr key={index}>
                        <td>{index}</td>
                      <td>{item.sirName}</td>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.mobileNumber}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.problem}</td>
                      <td><button>{item.status === 0 ? "Pending" : "Solve"}</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          "No Record Available"
        )}
      </Container>
    </>
  );
};

export default Appointment;
