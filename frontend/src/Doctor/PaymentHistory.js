/* global gapi */
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";
import Leftside from "../Dashbaord/LeftsideDoctor";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

const DocAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([]);
    const [link, setLink] = useState('');
    const [redirect, setRedirect] = useState(0);
    const [val, setVal] = useState(null);
    const [showAll, setShowAll] = useState(0);
    const { token } = useContext(AuthContext);

    const fetchAppointments = async () => {
        const config = {
            headers: {
              Authorization: `token ${token}`,
            },
          };
          await Axios.get(`${process.env.REACT_APP_SERVER_URL}/doctor/previous-appointment/`, config)
          .then(response => {
            setData(response.data);
            setIsLoading(false);
            setAppointments(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            setIsLoading(true);
          });
    };

    useEffect(() => {
        fetchAppointments()
    }, []);

    const selectAppointment = (id) => {
        setShowAll(id);
    }

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
            link: '/doctor/payment-history',
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
                    {isLoading && <h1>Loading</h1>}
                    {!isLoading && <div
                          className="col-9 col-md-9 p-4"
                          style={{
                            border: "15px solid #0099cc ",
                            height: "80vh",
                            backgroundColor: "#ffffff",
                          }}
                        >
                    
                    <div>
                  {appointments.length === 0 && <h1>No Previous Appointment to show</h1>}
                  
                  {showAll===0 && appointments.length !== 0 ?
                  
                  <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Prescription</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} onClick={() => selectAppointment(appointment.id)}>
                          <th scope="row">{appointment.appointment_date}</th>
                          <th scope="row">{appointment.appointment_time}</th>
                          <th scope="row">{appointment.patient}</th>
                          { appointment.prescription === null ?
                          <th scope="row"><Button style={{ fontSize: '10px', padding: '4px 8px' }} color="warning" onClick={() => handlepres(appointment.id, appointment)}>Add prescription</Button></th>
                          : 
                          <th scope="row"><Button style={{ fontSize: '10px', padding: '4px 8px' }} color="warning" onClick={() => handlepres(appointment.id, appointment)}>View prescription</Button></th>
                        }
                        </tr>
                      ))}
                    </tbody>
                  </table> 
                  : 
                  appointments.map((appointment) => {
                    if (showAll !==0 && appointment.id === showAll) {
                      return (
                    <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th scope="col"><Button style={{ fontSize: '10px', padding: '4px 8px' }} color="warning" onClick={() => selectAppointment(0)}>BACK</Button></th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Symptoms</th>
                        <th scope="col">Prescription</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr key={appointment.id}>
                          <th scope="row"></th>
                          <th scope="row">{appointment.appointment_date}</th>
                          <th scope="row">{appointment.appointment_time}</th>
                          <th scope="row">{appointment.patient}</th>
                          <th scope="row">{'(' + appointment.symptoms.split(',').join('), (') + ')'}</th>
                          { appointment.prescription === null ?
                          <th scope="row"><Button style={{ fontSize: '10px', padding: '4px 8px' }} color="warning" onClick={() => handlepres(appointment.id, appointment)}>Add prescription</Button></th>
                          : 
                          <th scope="row"><Button style={{ fontSize: '10px', padding: '4px 8px' }} color="warning" onClick={() => handlepres(appointment.id, appointment)}>View prescription</Button></th>
                        }
                        </tr>
                    </tbody>
                  </table>
                      );
                      } else{
                        return null;
                      }
                  })}
                  </div> 
                  </div>}
                </div>
              
            </div>
        </div>
    );
};

export default DocAppointments;