import React from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor";
import TodaysSchedule from "../Doctor/TodaysSchedule";
import "../Dashbaord/dashboard.css";

const DoctorDashboard = () => {
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
              overflow: 'auto'
            }}
          >
            <h3 style={{color: '#002db3', height: '2px'}}>Upcoming Appointments</h3>
            <br></br>
            <hr style={{backgroundColor: 'black', height:'2px'}}></hr>
            <br></br>
            <TodaysSchedule />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
