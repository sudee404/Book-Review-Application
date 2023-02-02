import { MDBCheckbox } from 'mdb-react-ui-kit';
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { login } from '../endpoints/api';


export default function LoginForm() {
	const [formData, setFormData] = useState({});
	const cookies = new Cookies();
	
	const handleChange = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	};

	const handleSignin = event => {
		event.preventDefault();
		if (formData.username && formData.password) {
			login(formData)
				.then((response) => {
					console.log(response);
					cookies.set("token", response.data.token, { path: "/" });
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			console.error('Form data is not properly populated');
		}
	};
	return (
		<form onSubmit={handleSignin}>
			<div className="form-floating my-3">
				<input onChange={handleChange} type="text" name='username' className="form-control" placeholder="alice254" />
				<label htmlFor="floatingInputValue">Username</label>
			</div>
			<div className="form-floating my-3">
				<input onChange={handleChange} type="password" name='password' className="form-control" placeholder="password" />
				<label htmlFor="floatingInputValue">Password</label>
			</div>
			<div className="d-flex justify-content-between mx-4 mb-4">
				<MDBCheckbox name='flexCheck' value='' id='flexCheckDefault1' label='Remember me' />
				<a href="!#">Forgot password?</a>
			</div>

			<button type="submit" className='w-100 btn btn-primary'>Sign In</button>
		</form>
	);
}