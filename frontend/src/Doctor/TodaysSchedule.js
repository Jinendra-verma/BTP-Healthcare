import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";

const TodaysSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const { token } = useContext(AuthContext);
  const [showAll, setShowAll] = useState(0);
  const [redirect, setRedirect] = useState(0);
  const [data, setData] = useState([]);

    const fetchAppointments = async () => {

      const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
      await Axios.get(`${process.env.REACT_APP_SERVER_URL}/doctor/appointment/`, config)
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

  const selectAppointment = (id) => {
    setShowAll(id);
  }

  const handleRedirect = (id) => {
    setRedirect(id)
  }

  if(redirect !== 0){
    return <Redirect
      to={{
        pathname: "/doctor/viewpat",
        state: {
          id: redirect,
          link: '/doctor',
        },
      }}
    />
  }

  return (
    <div>
     {appointments.length === 0 && <h1>No Appointments to show</h1>}
    
    {showAll===0 && appointments.length !== 0 ?
    
    <table className="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Patient Name</th>
          <th scope="col">Meet Link</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.id} onClick={() => selectAppointment(appointment.id)}>
            <th scope="row">{appointment.appointment_date}</th>
            <th scope="row">{appointment.appointment_time}</th>
            <th scope="row">{appointment.patient.patient_name}</th>
            <th scope="row"><a href={appointment.meeting_link} target="_blank">Join Meet</a></th>
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
          <th scope="col">Meet Link</th>
        </tr>
      </thead>
      <tbody>
          <tr key={appointment.id}>
            <th scope="row"></th>
            <th scope="row">{appointment.appointment_date}</th>
            <th scope="row">{appointment.appointment_time}</th>
            <th scope="row" onClick={() => {handleRedirect(appointment.id)}}><u>{appointment.patient.patient_name}</u></th>
            <th scope="row">{'(' + appointment.symptoms.split(',').join('), (') + ')'}</th>
            <th scope="row"><a href={appointment.meeting_link} target="_blank">Join Meet</a></th>
          </tr>
      </tbody>
    </table>
        );
        } else{
          return null;
        }
    })}
    </div>
  );
};

export default TodaysSchedule;
