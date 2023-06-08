import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "reactstrap";
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

const DoctorPrescriptionForm = (props) => {
  const { id, val, link } = props;
  const [patientName, setPatientName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [testsRequired, setTestsRequired] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [additionalAdvice, setAdditionalAdvice] = useState("");
  const [appointments, setAppointments] = useState([]);
  const { token } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState([]);

  const medType = ["Tablet", "Capsule", "Syrup", "Ointment", "Injection"];

  const dosageTimeOptions = [
    "1-0-1",
    "1-1-1",
    "1-1-0",
    "1-0-0",
    "0-1-1",
    "0-0-1",
    "0-1-0"
  ];

  const takeAsOptions = [
    "None",
    "Normal Water",
    "Warm Water",
    "Milk",
    "Meal",
    "Before Meal",
    "After Meal"
  ];

  const dosageOptions = 
    [
      "1/2 table spoon",
      "1 table spoon",
      "2 table spoon",
      "5 ml",
      "10 ml",
      "15 ml",
      "single",
      "1/2", 
      "1"
    ];

  const handleAddTest = () => {
    setTestsRequired([...testsRequired, ""]);
  };

  const handleRemoveTest = (index) => {
    const updatedTests = [...testsRequired];
    updatedTests.splice(index, 1);
    setTestsRequired(updatedTests);
  };

  const handleAddMedicine = () => {
    const newMedicine = {
      name: "",
      type: "",
      dosage: "",
      times: "",
      duration: 1,
      With: ""
    };
    setMedicines([...medicines, newMedicine]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  const handleMedicineChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedicines = [...medicines];
    updatedMedicines[index][name] = value;
    setMedicines(updatedMedicines);
  };

  const handleWithChange = (e, index) => {
    const { value } = e.target;
    const updatedMedicines = [...medicines];
    updatedMedicines[index].With = value;
    setMedicines(updatedMedicines);
  };

  const handleDosageTimesChange = (e, index) => {
    const { value } = e.target;
    const updatedMedicines = [...medicines];
    updatedMedicines[index].times = value;
    setMedicines(updatedMedicines);
  };

  const handleMedicineTypeChange = (e, index) => {
    const { value } = e.target;
    const updatedMedicines = [...medicines];
    updatedMedicines[index].type = value.split(",");
    setMedicines(updatedMedicines);
  };

  const handleDurationTimeChange = (e, index) => {
    const { value } = e.target;
    const updatedMedicines = [...medicines];
    updatedMedicines[index].duration = value;
    setMedicines(updatedMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id)
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };
    await Axios.post(`${process.env.REACT_APP_SERVER_URL}/doctor/appointment/${id}/prescription/`, {
                          diagnosis: diagnosis,
                          test_required: testsRequired.join(", "),
                          advice: additionalAdvice,
                          medicine: medicines,
                      },
                      config)
    .then(response => {
      setData(response.data);
      setRedirect(true);
      setAppointments(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    console.log(data);
  };

  if(redirect){
    return <Redirect
      to={{
        pathname: "/doctor/payment-history",
      }}
    />
  }

  return (
    <div style={{ height: '450px', overflow: 'auto' }}>
      {val.prescription === null ?
    <form style={{ backgroundColor: '#e0ebeb', color: '#0099cc', width: '500px' }}>
      <label style = {{margin: '15px'}}>
        Patient Name:
        <input
          readOnly={true}
          type="text"
          style = {{margin: '15px'}}
          value={val.patient}
        />
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <label style = {{margin: '15px'}}>
        Symptoms:
        <input
          readOnly={true}
          style = {{margin: '15px'}}
          type="text"
          value={'(' + val.symptoms.split(',').join('), (') + ')'}
        />
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <label style = {{margin: '15px'}}>
        Diagnosis:
        <textarea
          style = {{margin: '15px'}}
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <label style = {{margin: '15px'}}>
        Tests Required:
        {testsRequired.map((test, index) => (
          <div key={index}>
            <input
              style = {{margin: '15px'}}
              type="text"
              value={test}
              onChange={(e) => {
                const updatedTests = [...testsRequired];
                updatedTests[index] = e.target.value;
                setTestsRequired(updatedTests);
              }}
            />
            <button type="button" style = {{margin: '15px' , padding:'2px'}} onClick={() => handleRemoveTest(index)}>
              Remove Test
            </button>
            <hr style = {{backgroundColor: 'black', margin: '10px'}}></hr>
          </div>
        ))}
        <button style = {{margin: '15px' , padding:'2px'}} type="button" onClick={handleAddTest}>
          Add Test
        </button>
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      {medicines.map((medicine, index) => (
        <div key={index}>
          <label style = {{margin: '15px'}}>
            Medicine Name:
            <input
              style = {{margin: '15px'}}
              type="text"
              name="name"
              value={medicine.name}
              onChange={(e) => handleMedicineChange(e, index)}
            />
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Medicine Type:
            <select
              style = {{margin: '15px'}}
              name="type"
              value={medicine.type}
              onChange={(e) => handleMedicineTypeChange(e, index)}
            >
              {medType.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Dosage:
            <select
              style = {{margin: '15px'}}
              name="dosage"
              value={medicine.dosage}
              onChange={(e) => handleMedicineChange(e, index)}
            >
              {dosageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Dosage Times:
            <select
              style = {{margin: '15px'}}
              name="type"
              value={medicine.times}
              onChange={(e) => handleDosageTimesChange(e, index)}
            >
              {dosageTimeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Duration of Medicine (in days):
            <input
              style = {{margin: '15px'}}
              type="number"
              min={1}
              value={medicine.duration}
              onChange={(e) => handleDurationTimeChange(e, index)}
            />
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Take Medicine With:
            <select
              style = {{margin: '15px'}}
              name="type"
              value={medicine.With}
              onChange={(e) => handleWithChange(e, index)}
            >
              {takeAsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

          <button style = {{margin: '15px'}} type="button" onClick={() => handleRemoveMedicine(index)}>
            Remove Medicine
          </button>
          <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>
        </div>
      ))}

      <button style = {{margin: '15px' , padding:'2px'}} type="button" onClick={handleAddMedicine}>
        Add Medicine
      </button>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <label style = {{margin: '15px'}}>
        Additional Advice:
        <textarea
          style = {{margin: '15px'}}
          value={additionalAdvice}
          onChange={(e) => setAdditionalAdvice(e.target.value)}
        />
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <Button style = {{margin: '15px', backgroundColor:'#0099ff'}} onClick={handleSubmit}>Submit</Button>
      <Link to="/doctor/payment-history">
        <Button style = {{margin: '15px', backgroundColor:'red'}}>Cancel</Button>
      </Link>
    </form>
    : 
    
    <form style={{ backgroundColor: '#e0ebeb', color: '#0099cc', width: '500px' }}>
      
      {val.hasOwnProperty("patient") ?
        <label style = {{margin: '15px'}}>
          Patient Name:
          <input
            readOnly={true}
            type="text"
            style = {{margin: '15px'}}
            value={ val.patient}
          />
        </label>
        :
        <label style = {{margin: '15px'}}>
          Doctor Name:
          <input
            readOnly={true}
            type="text"
            style = {{margin: '15px'}}
            value={ val.doctor}
          />
        </label>
      }
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <label style = {{margin: '15px'}}>
        Symptoms:
        <input
          readOnly={true}
          style = {{margin: '15px'}}
          type="text"
          value={'(' + val.symptoms.split(',').join('), (') + ')'}
        />
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <label style = {{margin: '15px'}}>
        Diagnosis:
        <textarea
          readOnly={true}
          style = {{margin: '15px'}}
          value={val.prescription.diagnosis}
        />
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      <label style = {{margin: '15px'}}>
        Tests Required:
        {val.prescription.test_required.split(', ').map((test, index) => (
          <div key={index}>
            <input
              readOnly={true}
              style = {{margin: '15px'}}
              type="text"
              value={test}
            />
          </div>
        ))}
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

      {val.prescription.medicine.map((medicine, index) => (
        <div key={index}>
          <label style = {{margin: '15px'}}>
            Medicine Name:
            <input
              readOnly={true}
              style = {{margin: '15px'}}
              type="text"
              name="name"
              value={medicine.name}
            />
          </label>
          
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Medicine Type:
            <input
              readOnly={true}
              style = {{margin: '15px'}}
              type="text"
              name="type"
              value={medicine.type}
            />
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Dosage:
            <input
              readOnly={true}
              style = {{margin: '15px'}}
              type="text"
              name="dosage"
              value={medicine.dosage}
            />
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Dosage Times:
            <input
              readOnly={true}
              style = {{margin: '15px'}}
              type="text"
              name="times"
              value={medicine.times}
            />
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Duration of Medicine (in days):
            <input
              readOnly={true}
              style = {{margin: '15px'}}
              type="number"
              min={1}
              value={medicine.duration}
            />
          </label>
          <hr style = {{backgroundColor: 'black', margin: '10px', width: '350px'}}></hr>

          <label style = {{margin: '15px'}}>
            Take Medicine With:
            <input
              readOnly={true}
              style = {{margin: '15px'}}
              type="text"
              value={medicine.With}
            />
          </label>
          <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>
        </div>
        
      ))}

      

      <label style = {{margin: '15px'}}>
        Additional Advice:
        <textarea
          readOnly={true}
          style = {{margin: '15px'}}
          value={val.prescription.advice}
        />
      </label>
      <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>
    </form>
    }
    </div>
  );
};

export default DoctorPrescriptionForm;
