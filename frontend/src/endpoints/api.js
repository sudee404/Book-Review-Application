import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export const login = async(formData) => {
	return await axios.post(`${BASE_URL}login/`, formData);
};

export const logout = () => {
	return axios.post(`${BASE_URL}logout/`);
};

export const register = (formData) => {
	return axios.post(`${BASE_URL}register/`, formData);
};
