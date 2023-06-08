import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../Dashbaord/dashboard.css";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "reactstrap";

const DoctorUpdateDetailsForm = () => {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [department, setDepartment] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [fees, setFees] = useState("");
  const [pincode, setPincode] = useState("");
  const [picture, setPicture] = useState(null);

  const getDoctorDetails = async () => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/doctor/profile/`, config)
      .then((response) => {
        setDoctor(response.data);
        setDepartment(response.data.profile_data.specialization);
        setMobile(response.data.profile_data.mobile);
        setAddress(response.data.profile_data.address);
        setPincode(response.data.profile_data.pincode);
        setFees(response.data.profile_data.feesperSession);
        window.localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getDoctorDetails();
  }, [token]);

  if (redirect) {
    return <Redirect to="/doctor/perosnaldetails" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    let formData = new FormData();
    formData.append('address', address)
    formData.append('mobile', mobile)
    formData.append('feesperSession', fees)
    formData.append('pincode', pincode)
    if(picture !== null)formData.append('pic', picture)

    await Axios.put(
      `${process.env.REACT_APP_SERVER_URL}/doctor/profile/`, formData, config)
      .then((response) => {
        console.log(response);
        setRedirect(true);
      })
      .catch((error) => {
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
                overflow: 'auto',
              }}
            >
              <div className="row ">
                <div className="col-9 col-md-9 p-4">
                  <div className="card mb-4" style={{backgroundColor: "#0099cc"}}>
                    <h4 className="card-header" style={{ color:"white"}}>Update Details</h4>
                    <form onSubmit={handleSubmit}>
                      <ul className="list-group">
                        <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                          <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                            Phone No:
                          </span>
                          <input
                            style={{border: '', width:'30vw', borderColor:'black'}}
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </li>
                        <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                          <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                            Address
                          </span>
                          <input
                            style={{border: '', width:'30vw', borderColor:'black'}}
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
                            style={{border: '', width:'30vw', borderColor:'black'}}
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                          />
                        </li>
                        <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                          <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                            Fees per Session
                          </span>
                          <input
                            style={{border: '', width:'30vw', borderColor:'black'}}
                            type="text"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                          />
                        </li>
                        <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                          <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                            Select Profile Picture
                          </span>
                          <input
                            type="file"
                            style={{border: '', width:'30vw', borderColor:'black'}}
                            onChange={(e) => setPicture(e.target.files[0])}
                          />
                          {picture && (
                            <div>
                              <p>Selected File: {picture.name}</p>
                              <img style={{width: 100, height: 100}} src={URL.createObjectURL(picture)} alt="Selected Profile" />
                            </div>
                          )}
                        </li>
                      </ul>
                      <Button type="submit" style={{marginLeft:"300px" , marginRight:"300px" , marginTop:"10px" , marginBottom:"10px"}}>Update</Button>
                      </form>
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
export default DoctorUpdateDetailsForm;
        
