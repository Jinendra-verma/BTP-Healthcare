import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../Dashbaord/dashboard.css";
import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "reactstrap";

const ViewPat = (props) => {
  const { id, link } = props.location.state;
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const getPatientDetails = async () => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    let id1 = id.toString();
    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/doctor/patient/profile/`, {
                        params: {
                        appointment: id1
                        },
                        headers: {
                        Authorization: `token ${token}`
                        }
                    })
    .then(response => {
      setPatient(response.data);
      window.localStorage.setItem("user", JSON.stringify(response.data));
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });

  };

  useEffect(() => {
    setLoading(true);
    getPatientDetails();
  }, [token]);

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Navbar />
      {loading ? (
        <div className="row justify-content-center position-relative">
          <div
            className="spinner-border align-middle d-flex justify-content-center position-absolute top-50 start-50 translate-middle"
            style={{ width: "10rem", height: "10rem" }}
            role="status"
          ></div>
        </div>
      ) : (
        <div>
          <div className="row m-5" style={{ maxWidth: "100%" }}>
            <div
              className="col-3 col-md-3 p-4 bg-white "
              style={{ height: "80vh" }}
            >
              <Leftside />
            </div>
            <div
              className="col-9 col-md-9 p-4"
              style={{
                border: "15px solid #0099cc ",
                height: "80vh",
                backgroundColor: "#ffffff",
                overflow: 'auto'
              }}
            >
              <div className="row ">
                <div className="col-9 col-md-9 p-4">
                  <div className="card mb-4" style={{backgroundColor: "#0099cc"}}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginInline:'1vw' }}>
                        <h4 className="card-header" style={{ color:"white"}}>Personal Details</h4>
                      <Link to={link}>
                        <Button color="warning">Back</Button>
                      </Link>
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Name:
                        </span>
                        <i style={{ color:"white"}}>{patient.patient_profile.patient_name}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Email:
                        </span>
                        <i style={{ color:"white"}}>{patient.patient_profile.email}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Phone No:
                        </span>
                        <i style={{ color:"white"}}>{patient.patient_profile.mobile}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Age
                        </span>
                        <i style={{ color:"white"}}>{patient.patient_profile.age}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Gender
                        </span>
                        <i style={{ color:"white"}}>{patient.patient_profile.gender}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Address
                        </span>
                        <i style={{ color:"white"}}>{patient.patient_profile.address}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Pincode
                        </span>
                        <i style={{ color:"white"}}>{patient.patient_profile.pincode}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Reports
                        </span>
                        {/* {patient.profile_data.address} */}
                      </li>
                    </ul>
                  </div>
                  {patient.patient_history.length === 0 && <h1>No History to show</h1>}
                                {patient.patient_history.length !== 0 ?
                                    <table className="table table-hover table-dark" style={{overflow: 'auto'}}>
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Doctor Name</th>
                                                <th scope="col">Symptoms</th>
                                                <th scope="col">Prescription</th>
                                            </tr>
                                        </thead>
                                        { patient.patient_history.map((Appointment) => (
                                        <tbody>
                                            <tr key={Appointment.id}>
                                                <th scope="row">{Appointment.appointment_date}</th>
                                                <th scope="row">{Appointment.appointment_time}</th>
                                                <th scope="row">{Appointment.doctor}</th>
                                                <th scope="row">{'(' + Appointment.symptoms.split(',').join('), (') + ')'}</th>  
                                                <th scope="row">
                                                    Prescription
                                                </th>
                                            </tr>
                                        </tbody>
                                        ))}
                                    </table> : <div></div>}
                </div>
                <div className="col-3 col-md-3 p-4 ">
                  <img
                    src={patient.patient_profile.pic}
                    // className="rounded-circle"

                    style={{ width: "100%" }}
                    alt="No Profile Picture to display"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewPat;
