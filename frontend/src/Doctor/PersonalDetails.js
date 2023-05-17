import React, { useContext, useMemo } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useHistory, useParams } from 'react-router-dom';
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "reactstrap";

const PersonalDetails = () => {
  const { token } = useContext(AuthContext);
  const [doctor, setDoctor] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDoctorDetails = async () => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/doctor/profile/`, config)
    .then(response => {
      setDoctor(response.data);
      window.localStorage.setItem("user", JSON.stringify(response.data));
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });

    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/doctor/feedback/`, config)
    .then(response => {
      setFeedback(response.data);
      setLoading(false);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });

  };

  useEffect(() => {
    setLoading(true);
    getDoctorDetails();
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
                <Link to="/doctor/update-details">
                  <Button color="warning" style={{backgroundColor: "#00cc00", color:"white"}}>Update Details</Button>
                </Link>
              </div>
              <ul className="list-group">
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2 " style={{backgroundColor: "#00cc00"}}>
                    Name:
                  </span>
                  <span className="text-uppercase"><i style={{ color:"white"}}>{doctor.user_data.first_name} {doctor.user_data.last_name}</i></span>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Specialization:
                  </span>
                  <span className="text-capitalize" >
                  <i style={{ color:"white"}}>{doctor.profile_data.specialization}</i>
                  </span>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Phone No:
                  </span>
                  <i style={{ color:"white"}}>{doctor.profile_data.mobile}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Clinic Name:
                  </span>
                  <i style={{ color:"white"}}>{doctor.profile_data.clinic_name}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Clinic Address:
                  </span>
                  <i style={{ color:"white"}}>{doctor.profile_data.address}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Pincode:
                  </span>
                  <i style={{ color:"white"}}>{doctor.profile_data.pincode}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Registration Number:
                  </span>
                  <i style={{ color:"white"}}>{doctor.profile_data.registration_num}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Gender:
                  </span>
                  <i style={{ color:"white"}}>{doctor.profile_data.gender}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-info mr-2 p-2 text-uppercase" style={{backgroundColor: "#00cc00"}}>
                    Fees per Session:
                  </span>
                  <i style={{ color:"white"}}>{doctor.profile_data.feesperSession}</i>
                </li>
              </ul>
              <span className=" text-uppercase" style={{margin:'10px', color:"white"}}>
                    Feedbacks:
              </span>
              <ul className="list-group">
                {feedback != null &&feedback.map((feed, index) => (
                  <li className="list-group-item">
                    <span className="badge badge-info mr-2 p-2 text-uppercase">
                      {index+1}
                    </span>
                    <span className="mr-2 p-2 text-uppercase">
                      Rating: {feed.rating}
                    </span>
                    <span className="mr-2 p-2 text-uppercase">
                      Comment: {feed.comment}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-3 col-md-3 p-4 ">
          <img
              src={doctor.profile_data.pic ? doctor.profile_data.pic : 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000'}
              // className="rounded-circle"

              style={{ width: "100%" }}
              alt="No picture to display"
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
