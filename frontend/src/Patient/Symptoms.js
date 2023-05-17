import React, { useState, useContext } from "react";
import Select from "react-select";
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import { Button } from "reactstrap";
import { AuthContext } from "../Auth/AuthContext";
import Axios from "axios";
import { Redirect } from 'react-router-dom';

const Symptoms = (props) => {
  const { date, doctor, slot } = props.location.data;
  const [redirect, setRedirect] = useState(false);
  const { token } = useContext(AuthContext);
  const [selectedOptions, setSelectedOptions] = useState([]);


  const symptomslist=['itching','skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain',
  'stomach_pain','acidity','ulcers_on_tongue','muscle_wasting','vomiting','burning_micturition','spotting_ urination',
  'fatigue','weight_gain','anxiety','cold_hands_and_feets','mood_swings','weight_loss','restlessness','lethargy',
  'patches_in_throat','irregular_sugar_level','cough','high_fever','sunken_eyes','breathlessness','sweating',
  'dehydration','indigestion','headache','yellowish_skin','dark_urine','nausea','loss_of_appetite','pain_behind_the_eyes',
  'back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
  'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
  'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
  'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
  'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
  'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
  'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
  'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
  'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
  'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
  'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
  'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
  'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
  'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
  'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
  'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
  'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
  'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
  'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
  'yellow_crust_ooze']

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  if(redirect){
    alert("Appointment Request Created Successfully!!")
    return <Redirect to="/patient/pending-appointment" />
  }

  const requestAppointment = async () => {

    const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
      
      let symp = "";
      
      for (let i = 0; i < selectedOptions.length; i++) {
        symp += selectedOptions[i].label;
        symp += ",";
      }
      
      const updatedStr = symp.slice(0, -1);
      console.log(updatedStr);
      
      await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/patient/appointment/${doctor.dr_id}/`,
        {
          appointment_time: `${slot}`,
          appointment_date: `${date}`,
          symptoms: `${updatedStr}`,
          allowed_ids: []
        },
        config
      )
        .then((response) => {
          setRedirect(true);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      
  };

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
                }}
              >
                <div>
                <h3>Select Symptoms</h3>
                <Select
                    isMulti
                    value={selectedOptions}
                    onChange={handleChange}
                    isAsync
                    cacheOptions
                    options={symptomslist.map((option, index) => ({
                        value: option,
                        label: option
                    }))}
                />
                {selectedOptions.length > 0 && (
                    <div>
                    <br></br>
                    <h3 style={{color: "black",fontSize: '25px'}}><b>Selected Symptoms</b></h3>
                    <ul>
                        {selectedOptions.map((option) => (
                            <li style={{color: "green", fontSize: '20px'}} key={option.value}>{option.label}</li>
                        ))}
                    </ul>
                    <Button color="warning" onClick={requestAppointment}>Request Appointment</Button>
                    </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Symptoms;
