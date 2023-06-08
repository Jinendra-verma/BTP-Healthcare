/* global gapi */
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";
import Leftside from "../Dashbaord/LeftsideDoctor";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

const DocPendingAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([]);
    const [link, setLink] = useState({});
    const [redirect, setRedirect] = useState(0);
    const [showAll, setShowAll] = useState(0);
    const { token } = useContext(AuthContext);

    const fetchAppointments = async () => {
        const config = {
            headers: {
              Authorization: `token ${token}`,
            },
          };
          await Axios.get(`${process.env.REACT_APP_SERVER_URL}/doctor/appointment/pending-requests/`, config)
          .then(response => {
            setData(response.data);
            setIsLoading(false);
            setAppointments(response.data);
          })
          .catch(error => {
            console.log(error);
            setIsLoading(true);
          });
    };

    useEffect(() => {
        fetchAppointments()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLink((prevState) => ({
          ...prevState,
          [name]: value
        }));
    };

    const selectAppointment = (id) => {
        setShowAll(id);
    }

    const handleAccept = async (id, date, time) => {
        const config = {
            headers: {
              Authorization: `token ${token}`,
            },
          };
          await Axios.put(`${process.env.REACT_APP_SERVER_URL}/doctor/appointment/${id}/`, {
                                appointment_date: date,
                                appointment_time: time,
                                status: 'confirmed',
                                meeting_link: link[id],
                            },
                            config
                        )
          .then(response => {
            setRedirect(-1);
          })
          .catch(error => {
            console.log(error);
          });
    }

    const handleReject = async (id, date, time) => {
        const config = {
            headers: {
              Authorization: `token ${token}`,
            },
          };
          await Axios.put(`${process.env.REACT_APP_SERVER_URL}/doctor/appointment/${id}/`, {
                                appointment_date: date,
                                appointment_time: time,
                                status: 'cancelled',
                            },
                            config
                        )
          .then(response => {
            setRedirect(-2);
          })
          .catch(error => {
            console.log(error);
          });  
    }

    if(redirect === -1){
        return <Redirect
            to={{
                pathname: "/doctor"
            }}
        />
    }else if(redirect === -2){
        return <Redirect
            to={{
                pathname: "/doctor"
            }}
        />
    }

    if(redirect > 0){
        return <Redirect
          to={{
            pathname: "/doctor/viewpat",
            state: {
              id: redirect,
              link: '/doctor/pending-appointment',
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
                            overflow: 'auto'
                        }}
                    >
                        <h3 style={{color: '#002db3', height: '2px'}}>Pending Appointment Requests</h3>
                        <br></br>
                        <hr style={{backgroundColor: 'black', height:'2px'}}></hr>
                        <br></br>
                            {appointments.length === 0 && <h1>No Pending Requests</h1>}
                                {appointments.length !== 0 ?
                                    
                                    <table className="table table-hover table-dark" style={{overflow: 'auto'}}>
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Patient Name</th>
                                                <th scope="col">Symptoms</th>
                                                <th scope="col">Action</th>
                                                <th scope="col">Enter Meeting Link</th>
                                            </tr>
                                        </thead>
                                        { appointments.map((Appointment) => (
                                        <tbody>
                                            <tr key={Appointment.id}>
                                                <th scope="row">{Appointment.appointment_date}</th>
                                                <th scope="row">{Appointment.appointment_time}</th>
                                                <th scope="row" onClick={() => {setRedirect(Appointment.id)}}><u>{Appointment.patient.patient_name}</u></th>
                                                <th scope="row">{'(' + Appointment.symptoms.split(',').join('), (') + ')'}</th>
                                                <th scope="row">
                                                    <Button style={{color: 'green', margin:'5px', backgroundColor: 'white'}} onClick={() => handleAccept(Appointment.id, Appointment.appointment_date, Appointment.appointment_time)}>Approve</Button>
                                                    <Button style={{color: 'red', margin:'5px', backgroundColor: 'white'}} onClick={() => handleReject(Appointment.id, Appointment.appointment_date, Appointment.appointment_time)}>Reject</Button>
                                                </th>    
                                                <th scope="row">
                                                    <input
                                                        type="text"
                                                        name={Appointment.id}
                                                        value={link[Appointment.id]}
                                                        onChange={handleChange}
                                                    />
                                                </th>
                                            </tr>
                                        </tbody>
                                        ))}
                                    </table>
                                    :
                                    <div></div>
                                }
                    </div> }
                </div>
            </div>
        </div>
    );
};

export default DocPendingAppointments;