import { MDBCheckbox } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { register } from '../endpoints/api';
import Cookies from 'universal-cookie';


const RegisterForm = () => {
	const [formData, setFormData] = useState({});
	const cookies = new Cookies();

	const handleChange = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (formData.username && formData.email && formData.password) {
			register(formData)
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
		<form onSubmit={handleSubmit}>
			<div className="form-floating my-3">
				<input onChange={handleChange} type="text" name='username' className="form-control" placeholder="alice254" />
				<label htmlFor="floatingInputValue">Username</label>
			</div>
			
			<div className="form-floating my-3">
				<input onChange={handleChange} type="email" name='email' className="form-control" placeholder="alice254" />
				<label htmlFor="floatingInputValue">Email</label>
			</div>

			<div className="form-floating my-3">
				<input onChange={handleChange} type="password" name='password' className="form-control" placeholder="password" />
				<label htmlFor="floatingInputValue">Password</label>
			</div>

			<div className="form-floating my-3">
				<input onChange={handleChange} type="password" name='password1' className="form-control" placeholder="password" />
				<label htmlFor="floatingInputValue">Confirm Password</label>
			</div>
			<div className="d-flex justify-content-between mx-4 mb-4">
				<MDBCheckbox name='flexCheck' value=''  label='I agree to the terms and conditions' />
			</div>

			<button type="submit" className='w-100 btn btn-primary'>Sign Up</button>
		</form>
	);
};

export default RegisterForm;
