import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, CardHeader, CardBody, FormGroup, CardFooter, Button, Label, Input } from 'reactstrap'
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import specialization from "../Doctor/specialization";

const SignupForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [department, setDepartment] = useState('Rheumatologist');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [fee, setFee] = useState('');
	const [clinic, setClinic] = useState('');
	const [reg, setReg] = useState();
	const [gender, setGender] = useState('male');
	const [error, setError] = useState(0);
	const [redirect, setRedirect] = useState(false);
	const [status, setStatus] = useState(0);
	const { token, setToken } = useContext(AuthContext);
	const history = useHistory();

	async function signup() {
		try {
			const data = {
				user_data: {
				  username: username,
				  first_name: firstname,
				  last_name: lastname,
				  password: password,
				  password2: password2,
				},
				profile_data: {
				  specialization: department,
				  address: address,
				  mobile: mobile,
				  feesperSession: fee,
				  pincode: code,
				  clinic_name: clinic,
				  registration_num: reg,
				  gender: gender,
				  email: email
				},
			  };
			let res = null;

			await axios.post(`${process.env.REACT_APP_SERVER_URL}/doctor/signup/`, data)
				.then(response => {
					res = response;
					setStatus(res.status);
					setError(1);
					console.log(response.status);
					if (response.status === 201) {
						alert("Signed Up Successfully, Please Login to continue!!")
						setRedirect(true);
					}else{
						alert(res);
					}
				})
				.catch(error => {
					console.error(error);
				});

		} catch (err) {
			console.log(err);
		}
	}

	if (redirect) {
		return <Redirect to="/doctorlogin" />;
	}


	return (
		<Container className='text-center'>
			<Row>
				<Col lg={6} className='offset-lg-3 mt-5 '>
					<Card>
						<Form>
							<CardHeader className=''>Please Enter your Details</CardHeader>
							<CardBody >
								<FormGroup row>
									<Label for='username' sm={3}>
										Username
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='username'
											id='username'
											placeholder='provide your username'
                                            required={true}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password' sm={3}>
										Password
									</Label>
									<Col sm={9}>
										<Input
											type='password'
											name='password'
											id='password'
											placeholder='your password here'
                                            required={true}
											onChange={(e) => setPassword(e.target.value)}
											onKeyPress={(target) => {
												if (target.charCode === 13) {
                          							signup();
                        					}
											} }
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password2' sm={3}>
										Confirm Password
									</Label>
									<Col sm={9}>
										<Input
											type='password'
											name='password2'
											id='password2'
											placeholder='confirm your password'
                                            required={true}
											onChange={(e) => setPassword2(e.target.value)}
											onKeyPress={(target) => {
												if (target.charCode === 13) {
                          							signup();
                        					}
											} }
										/>
									</Col>
								</FormGroup>
                                <FormGroup row>
									<Label for='firstname' sm={3}>
										First Name
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='firstname'
											id='firstname'
											placeholder='Provide your first name'
                                            required={true}
											onChange={(e) => setFirstname(e.target.value)}
										/>
									</Col>
								</FormGroup>
                                <FormGroup row>
									<Label for='lastname' sm={3}>
										Last Name
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='lastname'
											id='lastname'
											placeholder='Provide your last name'
                                            required={true}
											onChange={(e) => setLastname(e.target.value)}
										/>
									</Col>
								</FormGroup>
                                <FormGroup row>
									<Label for='department' sm={3}>
										Specialization
									</Label>
									<Col sm={3}>
									<select value={department} onChange={(e) => setDepartment(e.target.value)}>
										{specialization.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
										))}
									</select>
									</Col>
								</FormGroup>
                                <FormGroup row>
									<Label for='mobile' sm={3}>
										Mobile No.
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='moblie'
											id='mobile'
											placeholder='Provide your Mobile number here'
                                            required={true}
											onChange={(e) => setMobile(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='email' sm={3}>
										Email
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='email'
											id='email'
											placeholder='Provide your Email here'
                                            required={true}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='clinicName' sm={3}>
										Clinic Name
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='clinicName'
											id='clinicName'
											placeholder='Provide your Clinic Name here'
                                            required={true}
											onChange={(e) => setClinic(e.target.value)}
										/>
									</Col>
								</FormGroup>
                                <FormGroup row>
									<Label for='address' sm={3}>
										Clinic Address
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='address'
											id='address'
											placeholder='Provide your Residential Address here'
                                            required={true}
											onChange={(e) => setAddress(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='reg' sm={3}>
										Registration No.
									</Label>
									<Col sm={9}>
										<Input
											type='number'
											name='reg'
											id='reg'
											placeholder='Provide your Registration Number here'
                                            required={true}
											onChange={(e) => setReg(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='gender' sm={3}>
										Gender
									</Label>
									<Col sm={1}>
										<select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</Col>
								</FormGroup>
								<FormGroup row>
								  <Label for='address' sm={3}>
									Fees per Session
								  </Label>
									<Col sm={9}>
										<Input
											type='text'
											name='fee'
											id='fee'
											placeholder='Fees per Session'
                                            required={true}
											onChange={(e) => setFee(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='address' sm={3}>
										Pincode
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='pincode'
											id='pincode'
											placeholder='Provide your Pincode here'
                                            required={true}
											onChange={(e) => setCode(e.target.value)}
										/>
									</Col>
								</FormGroup>
								{status !== 201 && error===1 && <p className="warning" style={{ color: "red", fontSize: "15px" }}>Wrong username or password! Please try again</p>}
							</CardBody>
							<CardFooter>
								<Button block color="primary" onClick={signup}>
									Sign Up
								</Button>
							</CardFooter>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default SignupForm;