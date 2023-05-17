import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../Dashbaord/dashboard.css";
import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "reactstrap";

const PersonalDetails = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const getPatientDetails = async () => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patient/profile/`, config)
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
                overflow:"auto",
              }}
            >
              <div className="row"  >
                <div className="col-9 col-md-9 p-4" >
                  <div className="card mb-4" style={{backgroundColor: "#0099cc"}}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginInline:'1vw' }}>
                      <h4 className="card-header" style={{ color:"white"}}>Personal Details</h4>
                      <Link to="/patient/update-details">
                        <Button color="warning" style={{backgroundColor: "#00cc00", color:"white"}}>Update Details</Button>
                      </Link>
                    </div>
                    <ul className="list-group" >
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Name:
                        </span>
                        <i style={{ color:"white"}}>{patient.user_data.first_name} {patient.user_data.last_name}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Email:
                        </span>
                        <i style={{ color:"white"}}>{patient.profile_data.email}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Phone No:
                        </span>
                        <i style={{ color:"white"}}>{patient.profile_data.mobile}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Age
                        </span>
                        <i style={{ color:"white"}}>{patient.profile_data.age}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Gender
                        </span>
                        <i style={{ color:"white"}}>{patient.profile_data.gender}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Address
                        </span>
                        <i style={{ color:"white"}}>{patient.profile_data.address}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Pincode
                        </span>
                        <i style={{ color:"white"}}>{patient.profile_data.pincode}</i>
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Reports
                        </span>
                        {/* {patient.profile_data.address} */}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-3 col-md-3 p-4 ">
                  <img
                    src={patient.profile_data.pic ? patient.profile_data.pic : 'https://static.vecteezy.com/system/resources/previews/002/406/611/original/business-man-cartoon-character-vector.jpg'}
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
export default PersonalDetails;
