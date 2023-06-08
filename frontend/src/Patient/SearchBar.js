import React, { useState, useContext } from "react";
import Select from "react-select";
import Axios from "axios";
import { Button } from "reactstrap";
import { AuthContext } from "../Auth/AuthContext";
import { Link, Redirect } from "react-router-dom";

const SearchBar = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState({});
  const { token } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(0);
  const [doc, setDoc] = useState(null);
  const [disease, setDisease] = useState('');
  const [percentage, setPercentage] = useState(0);


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

  const analyze = async () => {
    
    let list = [];
    selectedOptions.forEach((option) => {
      list.push(option.value.toString());
    });

    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    await Axios.post(`${process.env.REACT_APP_SERVER_URL}/ML/predict-disease/`,{
                          symptoms: list,
                        } ,config)
    .then(response => {
      setData(response.data);
      setPercentage(response.data.confience_score*1)
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  };

  const handleRedirect = (doc) => {
    setDoc(doc);
    setRedirect(1);
  }

  const handleinfo = (disease) => {
    setDisease(disease);
    setRedirect(2);
  }

  const barStyles = {
    width: `${percentage}%`,
    backgroundColor: '#2196F3',
    height: '20px',
    transition: 'width 0.5s ease-in-out',
};

  if(redirect === 1){
    return <Redirect
      to={{
        pathname: "/patient/viewdoc",
        state: {
          doctor: doc,
          link: '/patient/predictdisease',
        },
      }}
    />
  }


  if(redirect === 2){
    return <Redirect
      to={{
        pathname: "/patient/diseaseinfo",
        state: {
          disease: disease,
        },
      }}
    />
  }

  return (
    <div >
      <h3>Select your Symptoms</h3>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        isAsync
        cacheOptions
        options={symptomslist.map((option, index) => ({
          value: index,
          label: option
        })).sort((a, b) => a.label.localeCompare(b.label))}
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
          <Button color="warning" onClick={analyze}>Analyze Symptoms</Button>
          <br></br><br></br>
          {Object.keys(data).length !== 0 &&
            
            <div className="col-sm-6 mb-2">
              <div className="text-info">
                <h5>
                  You are diagnosed with 
                  <span className="text-uppercase" style={{color: 'black'}}> {data.disease[0]} </span>
                  with 
                  <span className="text-uppercase" style={{color: 'black'}}> {data.confience_score}% </span> 
                  of chances
                </h5>
      
                  <div style={{ backgroundColor: '#f0f0f0', height: '20px' }}>
                    <div style={barStyles}></div>
                  </div>
                  <br></br>
                <button className="btn btn-sm btn-primary" onClick={() => handleinfo(data.disease[0])}> Know More About {data.disease[0]}</button>
              </div>
              <br></br><br></br>
              {data.dr_info.length !== 0 && data.dr_info.map((doc) => (
              <div className="card" style={{width: '25vw', borderColor: '#0099cc'}} key={doc.dr_id}>
                <div className="card-body">
                  <div className="text-info">
                    <h6>
                      Doctor Name:
                      <span className="text-uppercase"> {doc.dr_name}</span>
                    </h6>
                  </div>
                  <div>Specialization : {doc.specialization}</div>
                  <div>Phone Number : {doc.mobile}</div>
                  <div>Fees per Session : {doc.feesperSession}</div>
                  <br></br>
                  <div className="row mb-0 pb-0">
                    <div
                      className=" col align-self-end inline"
                      style={{ textAlign: "center" }}
                    >
                      <button className="btn btn-sm btn-primary" onClick={() => handleRedirect(doc)}> View Profile</button> 
                    </div>
                  </div>
                </div>
              </div>))}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default SearchBar;
