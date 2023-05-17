import React from 'react';
import Navbar from '../Basic/Navbar';
import SignupForm from '../Doctorlogin/SignupForm';


const DoctorSignup=()=>{

    return(
        <div >
            <div style={{height: "71vh", marginBottom: "10vh"}}>
            <Navbar/>
            <SignupForm/>
            </div>
            
        </div>
    )

}

export default DoctorSignup