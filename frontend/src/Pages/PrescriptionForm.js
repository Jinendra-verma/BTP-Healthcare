import React from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor";
import DoctorPrescriptionForm from "../Pages/DoctorPrescriptionForm";
import "../Dashbaord/dashboard.css";

const PrescriptionForm = (props) => {
  const { id, val, link } = props.location.state;
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
          <div
            className="col-9 col-md-9 p-4"
            style={{
              border: "15px solid #0099cc ",
              height: "80vh",
              backgroundColor: "#ffffff",
            }}
          >
            <h3 style={{ backgroundColor: '#e0ebeb', color: '#0099cc', height: '40px', width: '500px', textAlign: 'center', padding:'5px' }}><b>Fill Prescription Form</b></h3>
            <DoctorPrescriptionForm id={id} val={val} link={link} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;
