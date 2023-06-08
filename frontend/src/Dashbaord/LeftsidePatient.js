import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const LeftsidePatient = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/patient">
            <Option Value="Personal Details" />
          </Link>
        </li>
        <li>
          <Link to="/patient/predictdisease">
            <Option Value="Predict Disease" />
          </Link>
        </li>
        <li>
          <Link to="/patient/searchdoctor">
            <Option Value="Search Doctor" />
          </Link>
        </li>
        <li>
          <Link to="/patient/appointment-status">
            <Option Value="Upcoming Appointments" />
          </Link>
        </li>

        <li>
          <Link to="/patient/pending-appointment">
            <Option Value="Pending Appointments" />
          </Link>
        </li>

        <li>
          <Link to="/patient/previousappointments">
            <Option Value="Previous Appointments" />
          </Link>
        </li>

        

        <li>
          <Link to="/patient/setreminder">
            <Option Value="Set Reminder" />
          </Link>
        </li>
       
      </ul>
    </div>
  );
};

export default LeftsidePatient;
