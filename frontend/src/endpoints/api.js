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


export const search = async (query, perPage, page) => {
	const startIndex = (page - 1) * perPage;
	// const endIndex = startIndex + perPage;
	const response = await axios.get(
		`https://openlibrary.org/search.json?q=${query}&limit=${perPage}&offset=${startIndex}`
	);
	const books = response.data.docs;
	const totalResults = response.data.numFound;
	const totalPages = Math.ceil(totalResults / perPage);
	return {
		books: books.slice(0, perPage),
		totalResults,
		totalPages,
	};
};



export const getBook = (key) => {
	return axios.get(`https://openlibrary.org/works/${key}.json`);
};

export const getClubs = async () => {
	const response = await fetch(`${BASE_URL}clubs/`);
	return await response.json();
};

export const getAuthor = async (key) => {
	const response = await fetch(`https://openlibrary.org/authors/${key}.json`);
	return await response.json();
};

export const submitReview = (data, config) => {
	return axios.post(`${BASE_URL}reviews/`, data, config);
};

export const getReviews = async (bookId) => {
	const response = await fetch(`${BASE_URL}reviews/?book=${bookId}`);
	return response.json();
};

export const createClub = (data, config) => {
	const formData = new FormData();
	Object.keys(data).forEach((key) => {
		if (key === "poster") {
			formData.append(key, data[key], data[key].name);
		} else {
			formData.append(key, data[key]);
		}
	});
	return axios.post(`${BASE_URL}clubs/`, formData, config);
};

