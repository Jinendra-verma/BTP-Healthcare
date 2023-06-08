import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import { AuthContext } from "../Auth/AuthContext";

import Axios from "axios";

const BookingSlots = (props) => {
  const { date, doctor } = props.location.state;
  const { token } = useContext(AuthContext);
  const [Slots, setSlots] = useState([]);

  

  const fetchDate = async (dateToPost) => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };
  
    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patient/get-slots/`,
                  { "params":
                    {
                      "doctor": `${doctor.dr_id}`,
                      "date": `${dateToPost}`,         
                  }, ...config})
    .then(response => {
      setSlots(response.data);
    })
    .catch(error => {
      console.log(error);
    });

  }


    function getDateString() {
      let finalDate = date.getFullYear().toString()
      const month = date.getMonth() + 1
      const day = date.getDate();
  
      if(month < 10) {
        finalDate += ('-0' + month.toString())
      }
      else {
        finalDate += '-' + month.toString()
      }
  
      if(day < 10) {
        finalDate += ('-0' + day.toString())
      }
      else {
        finalDate += '-' + day.toString()
      }
  
      return finalDate.toString()
  
    }

  useEffect(() => {
    const dateToSend = getDateString()
    fetchDate(dateToSend);
  }, []);

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
            <h3 style={{color: '#002db3', height: '2px'}}>Available Slots</h3>
            <br></br>
            <hr style={{backgroundColor: 'black', height:'2px'}}></hr>
            <br></br>
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Slot</th>
                  <th scope="col">Booking Status</th>
                </tr>
              </thead>
              <tbody>
                {Slots.map((slot) => (
                  <tr key={slot.time}>
                    <th scope="row">{slot.time}</th>
                    {slot.isBooked ? (
                      <td>Booked</td>
                    ) : (
                      <td>
                        <Link
                          to={{
                            pathname: "/patient/symptoms",
                            data: {
                              date: getDateString(),
                              doctor:doctor,
                              slot: slot.time,
                            },
                          }}
                        >
                          Book Now
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSlots;
