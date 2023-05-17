import React, { useState } from "react";
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import { Link, Redirect } from "react-router-dom";
import { Button } from "reactstrap";

const ViewDoc = (props) => {
    const { doctor, link } = props.location.state;
    const [redirect, setRedirect] = useState(false)

    const redir = () => {
        setRedirect(true)
    }

    if(redirect){
        return <Redirect
      to={{
        pathname: link
      }}
    />
    }
 
  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div className="col-3 col-md-3 p-4 bg-white ">
            <LeftsidePatient />
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
                <h4 className="card-header" style={{ color:"white"}}> Personal Details</h4> 
                <Button color="warning" onClick={() => redir()}>Back</Button>
              </div>
              <ul className="list-group">
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2 " style={{backgroundColor: "#00cc00"}}>
                    Name:
                  </span>
                  <span className="text-uppercase"><i style={{ color:"white"}}>{doctor.dr_name}</i></span>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Specialization:
                  </span>
                  <span className="text-capitalize">
                  <i style={{ color:"white"}}>{doctor.specialization}</i>
                  </span>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Phone No:
                  </span>
                  <i style={{ color:"white"}}>{doctor.mobile}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Registration No:
                  </span>
                  <i style={{ color:"white"}}>{doctor.registration_num}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Email:
                  </span>
                  <i style={{ color:"white"}}>{doctor.email}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Gender:
                  </span>
                  <i style={{ color:"white"}}>{doctor.gender}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Clinic Address:
                  </span>
                  <i style={{ color:"white"}}>{doctor.address}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-success mr-2 p-2" style={{backgroundColor: "#00cc00"}}>
                    Pincode:
                  </span>
                  <i style={{ color:"white"}}>{doctor.pincode}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-info mr-2 p-2 text-uppercase" style={{backgroundColor: "#00cc00"}}>
                    Fees per Session:
                  </span>
                  <i style={{ color:"white"}}>{doctor.feesperSession}</i>
                </li>
                <li className="list-group-item" style={{backgroundColor: "#0099cc"}}>
                  <span className="badge badge-info mr-2 p-2 text-uppercase" style={{backgroundColor: "#00cc00"}}>
                    Feedbacks:
                  </span>
                  {doctor.feedback.map((item, index) => (
                    
                      <div key={index}>
                        <span className="mr-2 p-2 text-uppercase">
                          Rating: {item.rating}
                        </span>
                        <span className="mr-2 p-2 text-uppercase">
                          Comment: {item.comment}
                        </span>
                      </div>
                    
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3 col-md-3 p-4 ">
            <img
              src={doctor.pic}
              // className="rounded-circle"

              style={{ width: "100%" }}
              alt="No Profile Picture to display"
            />
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoc;