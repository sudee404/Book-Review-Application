import { MDBCheckbox } from 'mdb-react-ui-kit';
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { login } from '../endpoints/api';
import { useDispatch } from 'react-redux';
import { setId,setName } from '../redux/userSlice';


export default function LoginForm() {
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

	const handleSignin = event => {
		event.preventDefault();
		setFormErrors({});
		if (formData.username && formData.password) {
			login(formData)
				.then((response) => {
					console.log(response.data.userCred);
					cookies.set("token", response.data.token, { path: "/" });
					dispatch(setId(response.data.userCred['id']))
					dispatch(setName(response.data.userCred['username']))
				})
				.catch((error) => {
					console.log(error)
					setFormErrors(error.response.data);

				});
		} else {
			console.error('Form data is not properly populated');
			setFormErrors({ 'error': 'Form data is not properly populated' });
		}
	};
	return (
		<form onSubmit={handleSignin}>
			<small className='text-center text-danger'>{formErrors['error']}</small>

			<div className="form-floating my-3">
				<input onChange={handleChange} type="text" name='username' className={formErrors['username'] ? "form-control border-danger" : "form-control"} placeholder="alice254" />
				<label htmlFor="floatingInputValue">Username</label>
				<small className='text-danger'>{formErrors['username']}</small>
			</div>
			<div className="form-floating my-3">
				<input onChange={handleChange} type="password" name='password' className={formErrors['password'] ? "form-control border-danger" : "form-control"} placeholder="password" />
				<label htmlFor="floatingInputValue">Password</label>
				<small className='text-danger'>{formErrors['password']}</small>
			</div>
			<div className="d-flex justify-content-between mx-4 mb-4">
				<MDBCheckbox name='flexCheck' value='' id='flexCheckDefault1' label='Remember me' />
				<a href="!#">Forgot password?</a>
			</div>

			<button type="submit" className='w-100 btn btn-primary'>Sign In</button>
		</form>
	);
}