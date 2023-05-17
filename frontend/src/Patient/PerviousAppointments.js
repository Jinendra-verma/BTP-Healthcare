import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Scrollbar from "react-scrollbars-custom";
import { AuthContext } from "../Auth/AuthContext";
import { BsPencilSquare } from "react-icons/bs";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import { Button } from "reactstrap";

import Leftside from "../Dashbaord/LeftsidePatient";

import { Link, Redirect } from "react-router-dom";

const PatientAppointments = () => {
  const [Appointments, setAppointments] = useState([]);
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [redirect, setRedirect] = useState(0);
    const [val, setVal] = useState(null);

  const fetchAppointments = async () => {

    console.log(token)
    const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
      await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patient/previous-appointment/`, config)
      .then(response => {
        setData(response.data);
        setAppointments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(data);
    
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlepres = (id, val) => {
    setRedirect(id);
    setVal(val);
  }

  if(redirect !== 0){
    return <Redirect
      to={{
        pathname: "/prescription-form",
        state: {
          id: redirect,
          val: val,
          link: '/patient/previousappointments',
        },
      }}
    />
  }

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div
            className="col-3 col-md-3 p-4 bg-white "
            style={{ height: "80vh" }}
          >
            <Leftside />
          </div>
          <div
            className="col-9 col-md-9 p-3"
            style={{
              border: "15px solid #0099cc ",
              height: "80vh",
              backgroundColor: "#ffffff",
            }}
          > 
            {Appointments.length === 0 && <h1>No Previous Appointment to show</h1>}
            {Appointments.length !== 0 &&
            <Scrollbar
              noScrollX
              style={{ position: "", height: "73vh", width: "150vh" }}
              className="col-12 col-md-12"
            >
              <table className="table table-hover table-dark">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Prescription</th>
                    <th scope="col">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {Appointments.map((Appointment) => (
                    <tr key={Appointment.id}>
                      <th scope="row">{Appointment.appointment_date}</th>
                      <th scope="row">{Appointment.appointment_time}</th>
                      <th scope="row">{Appointment.doctor}</th>
                      { Appointment.prescription === null ?
                          <th scope="row">No Prescription Given</th>
                          : 
                          <th scope="row"><Button style={{ fontSize: '10px', padding: '4px 8px' }} color="warning" onClick={() => handlepres(Appointment.id, Appointment)}>View prescription</Button></th>
                        }
                      <th
                       scope="row">
                        <div style={{
                          display: 'flex'
                        }}>
                          <Link to={`/patient/feedback/${Appointment.id}`}>
                            <BsPencilSquare />
                          </Link>
                          {<div style={{
                            margin: '0 15px'
                          }}>Feedback</div>}
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Scrollbar>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;