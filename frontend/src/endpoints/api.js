import axios from "axios";

const BASE_URL = "http://localhost:8000/";

export const login = (formData) => {
	return axios.post(`${BASE_URL}login/`, formData);
};

export const logout = () => {
	return axios.post(`${BASE_URL}logout/`);
};

export const register = (formData) => {
	return axios.post(`${BASE_URL}register/`, formData);
};

export const search = (query,page=1) => {
	return axios.get(`https://openlibrary.org/search.json?q=${query}&page=${page}`);
};
    

export const details = (id) => {
	return axios.get(
		`http://openlibrary.org/api/volumes/brief/id/${id}.json`
	);
};