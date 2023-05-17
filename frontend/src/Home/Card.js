import { Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

const Card = ({ login = "Doctor", Image, link }) => {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();

  // async function patientLogin(e) {
  //   try {
  //     await window.gapi.auth2.getAuthInstance().signIn();
  //     const auth2 = await window.gapi.auth2.getAuthInstance();
  //     if (auth2.isSignedIn.get()) {
  //       console.log("[Google] Signed in successfully!");
  //       var profile = auth2.currentUser.get();
  //       console.log(profile);
  //       window.localStorage.setItem("token", profile.getAuthResponse().id_token);
  //       window.localStorage.setItem("googleId", profile.getId());

  //       const serverRes = await axios.post(
  //         `${process.env.REACT_APP_SERVER_URL}/patients/google-login/`,
  //         {
  //           tokenId: profile.getAuthResponse().id_token,
  //         }
  //       );

  //       if (serverRes) {
  //         console.log(serverRes.data.phoneNumberExists);

  //         setToken(profile.getAuthResponse().id_token);
  //         //setGoogleId(profile.getId());

  //         if (serverRes.data.phoneNumberExists === true) {
  //           history.push("/patient");
  //         } else {
  //           history.push("/patient/update-phone");
  //         }
  //       }
  //       else {
  //         const err = {err : "Server Didn't respond"}
  //         throw err;
  //       }
  //     }
  //   } catch (err) {
  //     console.log(`[Google] Some error occurred while signing in! ${err}`);
  //   }
  // }

  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img src={Image} className="card-img-top" alt="..." height="240" />
      <div className="card-body">
        {((!token) && login === "Doctor") && <Link to={link} className="btn btn-primary justify-content-center w-100">Login As A Doctor</Link>}
        {((token) && login === "Doctor") && <Link to={link} className="btn btn-primary justify-content-center w-100">My Dashboard</Link>}
        {(((!token) && login === "Patient") && <Link to={link} className="btn btn-primary justify-content-center w-100">Login As A Patient</Link>)}
        {((token) && login === "Patient") && <Link to={link} className="btn btn-primary justify-content-center w-100">My Dashboard</Link>}
      </div>
    </div>
  )
}

export default Card;