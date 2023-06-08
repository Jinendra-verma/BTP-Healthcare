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
            style={{ padding: '20px' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {/* <h5 className="card-title">Hospital Appointment Booking System</h5> */}
            <p className="card-text">
            Welcome to SymptoCare, your one-stop solution for personalized healthcare. With our intuitive app, you can easily predict diseases based on your symptoms, ensuring timely and accurate medical attention. Whether it's a nagging cough, a persistent headache, or any other discomfort, our advanced algorithm analyzes your symptoms and provides you with potential disease predictions. But that's not all – SymptoCare also offers a comprehensive range of features, including finding doctors in any specialization, booking appointments, setting medicine reminders, and uploading test reports. Take control of your health today with SymptoCare and make informed decisions for a healthier future.            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
