import React from "react";

import Image from "../image/doctor.jpg";

const About = () => {
  return (
    <div className="container">
    <div className="card my-5  ">
      <div className="row g-0">
        <div className="col-md-4 order-md-2">
          <img src={Image} className="img-fluid rounded-start" alt="..." 
          width={300}
            height={300}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Hospital Appointment Booking System</h5>
            <p className="card-text">
            A Hospital Management System is a software application that helps healthcare organizations manage their day-to-day operations efficiently. It provides various modules and features to streamline different aspects of hospital management, including patient management, appointment scheduling, pharmacy management, and reporting.

Here are some key modules and features typically found in a Hospital Management System:

Patient Management: This module handles patient registration, demographic information, medical history, and communication.

Appointment Scheduling: Allows staff to schedule and manage patient appointments, including doctors' availability, time slots, and reminders.

Reporting and Analytics: Generates various reports and analytics, such as patient demographics, financial reports, operational metrics, and quality measures.

Security and Access Control: Ensures data security and access control to protect patient privacy and comply with regulatory requirements like HIPAA.

Hospital Management Systems are designed to improve efficiency, enhance patient care, streamline administrative processes, and provide better overall management of healthcare facilities. They can be customized based on the specific needs and requirements of the hospital or healthcare organization.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
