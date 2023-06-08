/* global gapi */
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";
import Leftside from "../Dashbaord/LeftsidePatient";
import { Button } from "reactstrap";
import { BeatLoader  } from 'react-spinners';
import { Link, Redirect } from "react-router-dom";

const ShowDiseaseInfo = (props) => {
    const { disease } = props.location.state;
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({});
    const { token } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);

    const fetchInfo = async () => {
        const config = {
            headers: {
              Authorization: `token ${token}`,
            },
          };
          await Axios.post(`${process.env.REACT_APP_SERVER_URL}/ML/disease_info/`, {
                               disease_name: disease 
                            }, config)
          .then(response => {
            setData(response.data);
            setIsLoading(false);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            setIsLoading(true);
          });
    };

    useEffect(() => {
        fetchInfo()
    }, []);

    if(redirect){
        return <Redirect
          to={{
            pathname: "/patient/predictdisease",
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
                    {isLoading && <div className="loading-container">
                                    <h1 style={{color: 'white', paddingLeft: 10}}>Collecting Information</h1>
                                    <BeatLoader style={{paddingLeft: 20}}  color="#ffffff" size={50} />
                                  </div>}
                    {!isLoading && <div
                        className="col-9 col-md-9 p-4"
                        style={{
                            border: "15px solid #0099cc ",
                            height: "80vh",
                            backgroundColor: "#ffffff",
                            overflow: 'auto',
                        }}
                    >
                            {Object.keys(data).map((key) => (
                                <div key={key}>
                                    {key==='disease' ?
                                        <div>
                                            <button className="btn btn-sm btn-primary" onClick={() => setRedirect(true)}>Back</button>
                                            <br></br><br></br>
                                            <h3>{data[key]}:</h3>
                                            <hr style={{backgroundColor: "#0099cc", height: '2px'}}></hr>
                                        </div>
                                            :
                                        <div>
                                            <h3>{key}</h3>
                                            {data[key].map((line) => {
                                                return <p>{line}</p>
                                            })}
                                            <hr style={{backgroundColor: "#0099cc", height: '2px'}}></hr>
                                        </div>
                                    }
                                </div>
                            ))}
                    </div> }
                </div>
            </div>
        </div>
    );
};

export default ShowDiseaseInfo; 