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

export const search = (query, page = 1) => {
	return axios.get(
		`https://openlibrary.org/search.json?q=${query}&page=${page}`
	);
};

export const getBook = (key) => {
	return axios.get(`https://openlibrary.org/works/${key}.json`);
};

export const getAuthor = (key) => {
	return fetch(`https://openlibrary.org/authors/${key}.json`)
		.then(response => response.json());
};

export const submitReview = (data, config) => {
	return axios.post(`${BASE_URL}reviews/`, data, config);
};

export const getReviews = async (bookId) => {
	const response = await fetch(`${BASE_URL}reviews/?book=${bookId}`);
	return response.json();
};
