/* global gapi */
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";
import Leftside from "../Dashbaord/LeftsidePatient";
import { Button } from "reactstrap";

const AppointmentStatus = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState()
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(0);
    const { token } = useContext(AuthContext);

    const fetchAppointments = async () => {
        console.log(token)
        const config = {
            headers: {
              Authorization: `token ${token}`,
            },
          };
          await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patient/upcoming-appointment/`, config)
          .then(response => {
            setData(response.data);
            setIsLoading(false);
            console.log(data)
            setAppointments(response.data);
            console.log(appointments)
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
        
    };

    useEffect(() => {
        setIsLoading(true)
        fetchAppointments()
        setIsLoading(false)
    }, []);

    const selectAppointment = (id) => {
        setShowAll(id);
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
                            overflow: 'auto'
                        }}
                    >
                        <h3 style={{color: '#002db3', height: '2px'}}>Upcoming Appointments</h3>
                        <br></br>
                        <hr style={{backgroundColor: 'black', height:'2px'}}></hr>
                        <br></br>
                        {appointments.length === 0 && <h1>No Upcoming Appointments</h1>}
                                {appointments.length !== 0 && showAll===0 ?
                                    <table className="table table-hover table-dark">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Doctor Name</th>
                                                <th scope="col">Meet Link</th>
                                            </tr>
                                        </thead>
                                        { appointments.map((Appointment) => (
                                        <tbody>
                                            <tr key={Appointment.id} onClick={() => selectAppointment(Appointment.id)}>
                                                <th scope="row">{Appointment.appointment_date}</th>
                                                <th scope="row">{Appointment.appointment_time}</th>
                                                <th scope="row">{Appointment.dr_name}</th>
                                                <th scope="row"> <a href={Appointment.meeting_link} target="_blank">Join Meet</a></th>
                                            </tr>
                                        </tbody>
                                        ))}
                                    </table>
                                 : 
                                appointments.map((Appointment) => {
                                    
                                    if (showAll !==0 && Appointment.id === showAll) {
                                        return (
                                        
                                        <table className="table table-hover table-dark">
                                        <thead>
                                            <tr>
                                                <th scope="col"><Button style={{ fontSize: '10px', padding: '4px 8px' }} color="warning" onClick={() => selectAppointment(0)}>BACK</Button></th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Symptoms</th>
                                                <th scope="col">Doctor Name</th>
                                                <th scope="col">Meet Link</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                          <tr key={Appointment.id}>
                                            <th scope="row"></th>
                                            <th scope="row">{Appointment.appointment_date}</th>
                                            <th scope="row">{Appointment.appointment_time}</th>
                                            <th scope="row">{'(' + Appointment.symptoms.split(',').join('), (') + ')'}</th>
                                            <th scope="row">{Appointment.dr_name}</th>
                                            <th scope="row">
                                              <a href={Appointment.meeting_link} target="_blank" rel="noopener noreferrer">
                                                Join Meet
                                              </a>
                                            </th>
                                          </tr>
                                        </tbody>
                                        </table>
                                        );
                                    } else {
                                      return null;
                                    }
                                })
                                }
                    </div> }
                </div>
            </div>
        </div>
    );
};

export default AppointmentStatus;