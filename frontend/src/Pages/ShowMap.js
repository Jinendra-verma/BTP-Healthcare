import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import { Button } from "reactstrap";
import { Map, Marker } from 'google-maps-react';

import Leftside from "../Dashbaord/LeftsidePatient";

import { Link, Redirect } from "react-router-dom";

const ShowMap = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const fetchMap = async () => {

    const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
      await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patient/geolocation/map/`, config)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    
  };

  useEffect(() => {
    fetchMap();
  }, []);

  if(redirect){
    return <Redirect
      to={{
        pathname: "/patient/searchdoctor",
      }}
    />
  }

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
            className="col-9 col-md-9 p-3"
            style={{
              border: "15px solid #0099cc ",
              height: "80vh",
              backgroundColor: "#ffffff",
              overflow: 'auto'
            }}
          > 
          <button className="btn btn-sm btn-primary" onClick={() => setRedirect(true)}>Back</button>
          <Map
            google={window.google}
            zoom={10}
            initialCenter={{ lat: 37.7749, lng: -122.4194 }} 
          >
            
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMap;