import { MDBCheckbox } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { register } from '../endpoints/api';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { setId,setName, setToken } from '../redux/userSlice';

const RegisterForm = (props) => {
	const [formData, setFormData] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const cookies = new Cookies();
	const dispatch = useDispatch();

	const handleChange = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		setFormErrors({});
		if (formData.username && formData.email && formData.password) {
			register(formData)
				.then((response) => {
					cookies.set("token", response.data.token, { path: "/" });
					dispatch(setId(response.data.userCred['id']))
					dispatch(setName(response.data.userCred['username']))
					dispatch(setToken(response.data.token))
					props.after()

				})
				.catch((error) => {
					setFormErrors(error.response.data);
				});
		} else {
			console.error('Form data is not properly populated');
			setFormErrors({ 'error': 'Form data is not properly populated' });
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<small className='text-center text-danger'>{formErrors['error']}</small>
			<div className="form-floating my-3">
				<input onChange={handleChange} type="text" name='username' className={formErrors['username'] ? "form-control border-danger" : "form-control"} placeholder="alice254" />
				<label htmlFor="floatingInputValue">Username</label>
				<small className='text-danger'>{formErrors['username']}</small>
			</div>

			<div className="form-floating my-3">
				<input onChange={handleChange} type="email" name='email' className={formErrors['email'] ? "form-control border-danger" : "form-control"} placeholder="alice254" />
				<label htmlFor="floatingInputValue">Email</label>
				<small className='text-danger'>{formErrors['email']}</small>

			</div>

			<div className="form-floating my-3">
				<input onChange={handleChange} type="password" name='password' className={formErrors['password'] ? "form-control border-danger" : "form-control"} placeholder="password" />
				<label htmlFor="floatingInputValue">Password</label>
				<small className='text-danger'>{formErrors['password']}</small>
			</div>

			<div className="form-floating my-3">
				<input onChange={handleChange} type="password" name='password1' className="form-control" placeholder="password" />
				<label htmlFor="floatingInputValue">Confirm Password</label>
			</div>

			<div className="d-flex justify-content-between mx-4 mb-4">
				<MDBCheckbox name='flexCheck' value='' label='I agree to the terms and conditions' />
			</div>

			<button type="submit" className='w-100 btn btn-primary'>Sign Up</button>
		</form>
	);
};

export default RegisterForm;
