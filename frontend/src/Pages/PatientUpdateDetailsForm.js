import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../Dashbaord/dashboard.css";
import { Redirect } from 'react-router-dom';
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "reactstrap";

const PatientUpdateDetailsForm = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [age, setAge] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [picture, setPicture] = useState(null);
  const [reports, setReports] = useState('');

  const getPatientDetails = async () => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patient/profile/`, config)
    .then(response => {
      setPatient(response.data);
      setAge(response.data.profile_data.age);
      setEmail(response.data.profile_data.email);
      setMobile(response.data.profile_data.mobile);
      setAddress(response.data.profile_data.address);
      setPincode(response.data.profile_data.pincode);
      setPicture(response.data.profile_data.pic);
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

  if(redirect){
    return <Redirect to="/patient" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    await Axios.put(`${process.env.REACT_APP_SERVER_URL}/patient/profile/`, {
                        "profile_data":{
                          "age":`${age}`,
                          "address":`${address}`,
                          "mobile":`${mobile}`,
                          "email":`${email}`,
                          "pincode":`${pincode}`,
                          //"pic":`${picture}`,
                        }
                    }, config)
    .then(response => {
      console.log(response);
      setRedirect(true);
    })
    .catch(error => {
      console.log(error);
    });
  };

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
                overflow: "auto",
              }}
            >
              <div className="row ">
                <div className="col-9 col-md-9 p-4">
                  <div className="card mb-4" style={{backgroundColor: "#0099cc"}}>
                    <h4 className="card-header" style={{ color:"white"}}>Update Details</h4>
                    <ul className="list-group">
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Email:
                        </span>
                        <input
                          style={{border:'', width:'30vw' , borderColor:'black'}}
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Phone No:
                        </span>
                        <input
                          style={{border:'', width:'30vw' , borderColor:'black'}}
                          type="text"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Age
                        </span>
                        <input
                          style={{border:'', width:'30vw' , borderColor:'black'}}
                          type="text"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Address
                        </span>
                        <input
                          style={{border:'', width:'30vw' , borderColor:'black'}}
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Pincode
                        </span>
                        <input
                          style={{border:'', width:'30vw' , borderColor:'black'}}
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Select Profile Picture
                        </span>
                        <input
                          type="file"
                          style={{border:'', width:'30vw' , borderColor:'black'}}
                          accept="image/*"
                          onChange={(e) => setPicture(e.target.files[0])}
                        />
                        {picture && (
                          <div>
                            <p>Selected File: {picture.name}</p>
                            <img style={{width: 100, height: 100}} src={URL.createObjectURL(picture)} alt="Selected Profile" />
                          </div>
                        )}
                      </li>
                      <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                        <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                          Reports
                        </span>
                        {/* {patient.profile_data.address} */}
                      </li>
                    </ul>
                      <button type="submit" onClick={handleSubmit} style={{marginLeft:"300px" , marginRight:"300px" , marginTop:"10px" , marginBottom:"10px"}}>Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PatientUpdateDetailsForm;
