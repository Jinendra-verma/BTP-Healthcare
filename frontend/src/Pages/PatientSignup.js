import React from 'react';
import Navbar from '../Basic/Navbar';
import SignupForm from '../Patientlogin/SignupForm';


const PatientSignup=()=>{

    return(
        <div >
            <div style={{height: "71vh", marginBottom: "10vh"}}>
            <Navbar/>
            <SignupForm/>
            </div>
            
        </div>
    )

}

export default PatientSignup