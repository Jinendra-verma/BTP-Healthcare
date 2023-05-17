import React, { useState, useContext } from 'react';
import Navbar from '../Basic/Navbar';
import { Row, Input, Button } from 'reactstrap'
import { AuthContext } from "../Auth/AuthContext";
import { Link, useHistory, useParams } from 'react-router-dom';
import StarPicker from 'react-star-picker';
import Axios from 'axios';

const Feedback = () => {
	const [rating, setRating] = useState(0);
	const { token } = useContext(AuthContext);
	const [review, setReview] = useState('');
	const [data, setData] = useState([]);
	const appointmentId = useParams();

	const history = useHistory();

	const onChange = (value) => {
		setRating(value);
	}

	const putFeedback = async () => {

		console.log(appointmentId)
		const config = {
			headers: {
				Authorization: `token ${token}`,
			},
		};
		await Axios.post(`${process.env.REACT_APP_SERVER_URL}/patient/appointment/${appointmentId.id}/feedback/`, 
							{
								rating: rating,
								comment: review,
							}, config
						)
		.then(response => {
			setData(response.data);
			history.push("/patient/");
		})
		.catch(error => {
			console.log(error);
		});
		console.log(data);
	}

	return (<div>
		<Navbar />
		<div class="container mt-5 mb-5"
			style={{
				display: 'flex',
				flexFlow: 'column',
				padding: '20px',
				border: "15px solid #03203C ",
				height: "max-content",
				backgroundColor: "#35BDD0",
			}}
		>
			<h4 className="text-center m-3">It will be helpful if you share your Experience</h4>
			<Row style={{ justifyContent: 'center' }}>
				<StarPicker onChange={onChange} value={rating} size={40}></StarPicker>
			</Row>
			<Row className="m-3">
				<Input
					type="textarea"
					placeholder="Provide Short Information"
					maxLength="50px"
					style={{ height: "30vh" }}
					onChange={e => setReview(e.target.value)}
				/>
			</Row>

			<Row
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					padding: '20px 0px'
				}}>
				<Link to="/patient/previousappointments">
					<Button color="danger">GO BACK</Button>
				</Link>
				<Link to="/patient/previousappointments">
					<Button color="warning" onClick={putFeedback}>Submit</Button>
				</Link>
			</Row>
		</div>
	</div>)

}

export default Feedback