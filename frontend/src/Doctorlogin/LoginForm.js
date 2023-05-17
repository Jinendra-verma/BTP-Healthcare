import React, { useContext, useState } from 'react';
import { Redirect, useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, CardHeader, CardBody, FormGroup, CardFooter, Button, Label, Input } from 'reactstrap'
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(0);
	const { token, setToken } = useContext(AuthContext);
	const history = useHistory();

	async function login() {
		try {
			let res = null;
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/doctor/login/`,
							{
								username: username,
								password: password
							})
				.then(response => {
					res = response;
					setStatus(res.status);
					console.log(response.status);
					const token = res.data.token;
					if (res.status === 200) {
						window.localStorage.setItem("token", token);
						setToken(token);
						history.push('/doctor');
					}
				})
				.catch(error => {
					console.error(error);
				});
		} catch (err) {
			console.log(err);
		}
	}

	if (token) {
		return <Redirect to="/doctor" />
	}

	return (
		<Container className='text-center'>
			<Row>
				<Col lg={6} className='offset-lg-3 mt-5 '>
					<Card>
						<Form>
							<CardHeader className=''>Welcome back, Doc</CardHeader>
							<CardBody >
								<FormGroup row>
									<Label for='email' sm={3}>
										Username
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='username'
											id='username'
											placeholder='provide your username'
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
											onChange={(e) => setPassword(e.target.value)}
											onKeyPress={(target) => {
												if (target.charCode === 13) {
                          							login();
                        					}
											} }
										/>
									</Col>
								</FormGroup>
								{status === 201 && <p className="warning" style={{ color: "red", fontSize: "15px" }}>Wrong username or password! Please try again</p>}
							</CardBody>
							<CardFooter>
								<Button block color="primary" onClick={login}>
									Sign In
								</Button>
								<br></br>
								<Link block color="transparent" to={'/doctorsignup'}>
									New User?  Sign Up
								</Link>
							</CardFooter>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default LoginForm;