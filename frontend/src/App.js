/* global gapi */
import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import DoctorLogin from "./Pages/DoctorLogin";
import DoctorDashboard from "./Pages/DoctorDashboard";
import PaitentDashboard from "./Pages/PaitentDashboard";
import Error from "./Pages/Error";
import { AuthContext } from "./Auth/AuthContext";
import PhoneNumber from "./components/PhoneNumber";
import PersonalDetails from "./Doctor/PersonalDetails";
import SearchDoctor from "./Patient/SearchDoctor";
import PerviousAppointments from "./Patient/PerviousAppointments";
import Spinner from "react-bootstrap/Spinner";
import Selectdate from "./Patient/Selectdate";
import BookingSlots from "./Doctor/BookingSlots";
import Payment from "./Patient/Payment";
import DocAppointments from "./Doctor/PaymentHistory";
import AppointmentStatus from "./Patient/AppointmentStatus";
import Pfeedback from './Patient/Feedback';
import FeedbackDetails from './Doctor/FeedbackDetails';
import PatientLogin from "./Pages/PatientLogin";
import PatientSignup from "./Pages/PatientSignup";
import DoctorSignup from "./Pages/DoctorSignup";
import PatientUpdateDetailsForm from "./Pages/PatientUpdateDetailsForm";
import DoctorUpdateDetailsForm from "./Doctor/DoctorUpdateDetailsForm";
import PredictDisease from "./Patient/PredictDisease";
import PrescriptionForm from "./Pages/PrescriptionForm";
import Symptoms from "./Patient/Symptoms";
import PendingAppointments from "./Patient/PendingAppointments";
import DocPendingAppointments from "./Doctor/PendingAppointments";
import ViewDoc from "./Patient/ViewDoc";
import ViewPat from "./Doctor/ViewPat";
import ShowDiseaseInfo from "./Patient/ShowDiseaseInfo";
import SetReminder from "./Patient/SetReminder";
import ShowMap from "./Pages/ShowMap";

function App() {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	// const [googleId, setGoogleId] = useState(
	// 	window.localStorage.getItem("googleId")
	// );

	const [apiLoaded, setApiLoaded] = useState(true);

	// useEffect(() => {
	// 	if (window.gapi !== undefined) {
	// 		setApiLoaded(false);
	// 		window.gapi.load("client:auth2", initClient);
	// 		function initClient() {
	// 			window.gapi.client
	// 				.init({
	// 					apiKey: process.env.REACT_APP_API_KEY,
	// 					clientId: process.env.REACT_APP_CLIENT_ID,
	// 					discoveryDocs: [process.env.REACT_APP_DISCOVERY_DOCS],
	// 					scope: process.env.REACT_APP_SCOPE,
	// 				})
	// 				.then(
	// 					function () {
	// 						if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
	// 							console.log(
	// 								`Is signed in? ${window.gapi.auth2
	// 									.getAuthInstance()
	// 									.isSignedIn.get()}`
	// 							);
	// 						} else {
	// 							console.log("Currently Logged Out!!");
	// 						}
	// 						setApiLoaded(true);
	// 					},
	// 					function (error) {
	// 						console.log(`error ${JSON.stringify(error)}`);
	// 						setApiLoaded(true);
	// 					}
	// 				);
	// 		}
	// 		setApiLoaded(true);
	// 	} else {
	// 		console.log("[Google] inside the else block line 54 App.js");
	// 		setApiLoaded(false);
	// 	}

	// }, []);

	return apiLoaded ? (
		<Router>
			<AuthContext.Provider value={{ token, setToken }}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/doctorlogin" component={DoctorLogin} />
					<Route exact path="/patientlogin" component={PatientLogin} />
					<Route exact path="/patientsignup" component={PatientSignup} />
					<Route exact path="/doctorsignup" component={DoctorSignup} />
					<Route exact path="/patient/predictdisease" component={PredictDisease} />
					<Route exact path="/doctor" component={DoctorDashboard} />
					<Route exact path="/patient/searchdoctor" component={SearchDoctor} />
					<Route exact path="/patient" component={PaitentDashboard} />
					<Route exact path="/patient/update-phone" component={PhoneNumber} />
					<Route exact path="/patient/update-details" component={PatientUpdateDetailsForm} />
					<Route exact path="/doctor/update-details" component={DoctorUpdateDetailsForm} />
					<Route exact path="/prescription-form" component={PrescriptionForm} />
					<Route exact path="/patient/pending-appointment" component={PendingAppointments} />
					<Route exact path="/doctor/pending-appointment" component={DocPendingAppointments} />
					<Route exact path="/patient/viewdoc" component={ViewDoc} />
					<Route exact path="/doctor/viewpat" component={ViewPat} />
					<Route exact path="/patient/diseaseinfo" component={ShowDiseaseInfo} />
					<Route exact path="/patient/setreminder" component={SetReminder} />
					<Route exact path="/patient/showmap" component={ShowMap} />
					<Route
						exact
						path="/patient/previousappointments"
						component={PerviousAppointments}
					/>
					<Route
						exact
						path="/doctor/perosnaldetails"
						component={PersonalDetails}
					/>
					<Route
						exact
						path="/doctor/payment-history"
						component={DocAppointments}
					/>
					<Route exact path="/doctor/feedback/:id" component={FeedbackDetails} />

					<Route exact path="/patient/selectdate" component={Selectdate} />
					<Route exact path="/patient/book-slot" component={BookingSlots} />
					<Route exact path="/patient/payment" component={Payment} />
					<Route exact path="/patient/symptoms" component={Symptoms} />
					<Route exact path="/patient/appointment-status" component={AppointmentStatus} />
					<Route exact path="/patient/feedback/:id" component={Pfeedback} />

					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</AuthContext.Provider>
		</Router>
	) : (
		<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
			<Spinner animation="border" variant="danger" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
}

export default App;
