import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import { Button } from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Leftside from "../Dashbaord/LeftsidePatient";

import { Link, Redirect } from "react-router-dom";

const SetReminder = () => {
    
    const [reminders, setReminders] = useState([]);
    const { token } = useContext(AuthContext);
  
    const handleAddReminder = () => {
      const newReminder = {
        dateTime: new Date(),
        phone: "",
        msg: "",
      };
      setReminders([...reminders, newReminder]);
    };
  
    const handleRemoveReminder = (index) => {
      const updatedReminders = [...reminders];
      updatedReminders.splice(index, 1);
      setReminders(updatedReminders);
    };
  
    const handleDateTimeChange = (date, index) => {
        const value  = date;
        const updatedReminders = [...reminders];
        updatedReminders[index].dateTime = value;
        setReminders(updatedReminders);
    };
  
    const handlePhoneChange = (e, index) => {
      const { value } = e.target;
      const updatedReminders = [...reminders];
      updatedReminders[index].phone = value;
      setReminders(updatedReminders);
    };
  
    const handleMessageChange = (e, index) => {
        const { value } = e.target;
        const updatedReminders = [...reminders];
        updatedReminders[index].msg = value;
        setReminders(updatedReminders);
    };
  
    const handleSubmit = async (index) => {

      const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      
      const formattedDate = reminders[index].dateTime.toLocaleString(undefined, options).replace(/,/, '');
      const date = new Date(formattedDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const dat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


      await Axios.post(`${process.env.REACT_APP_SERVER_URL}/patient/alarm/`, {
                            dateTime: dat,
                            phone: reminders[index].phone,
                            msg: reminders[index].msg,
                        },
                        config)
      .then(response => {
        alert(response.data.status)
      })
      .catch(error => {
        console.log(error);
      });
    };

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
          <h3 style={{color: '#002db3', height: '2px'}}>Set Reminders</h3>
          <br></br>
          <hr style={{backgroundColor: 'black', height:'2px'}}></hr>
          <br></br>
            <form style={{ backgroundColor: '#e0ebeb', color: '#0099cc', width: '500px' }}>
                {reminders.map((reminder, index) => (
                    <div key={index}>
                    <label style = {{margin: '15px'}}>
                        Reminder Date and Time:
                        <DatePicker
                            selected={reminder.dateTime}
                            onChange={date => handleDateTimeChange(date, index)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={1}
                            dateFormat="yyyy-MM-dd HH:mm"
                        />
                    </label>
                    <hr style = {{backgroundColor: 'grey', margin: '10px', width: '350px'}}></hr>

                    <label style = {{margin: '15px'}}>
                        Mobile No.
                        <input
                            style = {{margin: '15px'}}
                            type="text"
                            name="phone"
                            value={reminder.phone}
                            onChange={(e) => handlePhoneChange(e, index)}
                        />
                    </label>
                    <hr style = {{backgroundColor: 'grey', margin: '10px', width: '350px'}}></hr>

                    <label style = {{margin: '15px'}}>
                        Message:
                        <textarea
                            style = {{margin: '15px'}}
                            name = "msg"
                            value={reminder.msg}
                            onChange={(e) => handleMessageChange(e, index)}
                        />
                    </label>
                    <hr style = {{backgroundColor: 'grey', margin: '10px', width: '350px'}}></hr>

                    <Button style = {{margin: '15px', backgroundColor:'#2d8659'}} onClick={() => {handleSubmit(index)}}>Set Reminder</Button>

                    <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>

                    <Button style = {{margin: '15px', backgroundColor:'#2d8659'}} type="button" onClick={() => handleRemoveReminder(index)}>
                        Remove Reminder
                    </Button>
                    <hr style = {{backgroundColor: 'grey', borderWidth: '3px', margin: '10px'}}></hr>
                    </div>
                ))}

                <Button style = {{margin: '15px', backgroundColor:'#2d8659'}} type="button" onClick={handleAddReminder}>
                    Add Reminder
                </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetReminder;