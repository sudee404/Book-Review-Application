import axios from "axios";
import { API_BASE_URL } from "../urls";

export async function POST(request) {
	const formData = await request.json();
	try {
		const response = await register(formData);
		return new Response(JSON.stringify(response.data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error.response.data), { status: 400 });
	}
}

async function register(formData = {}) {
	return await axios.post(`${API_BASE_URL}register/`, formData);
}
