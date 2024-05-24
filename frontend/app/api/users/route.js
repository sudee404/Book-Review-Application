import axios from "axios";
import { API_BASE_URL } from "../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
	try {
		const query = request.nextUrl.searchParams;
		const response = await getClubs(query);
		return new Response(JSON.stringify(response.data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error.response.data), {
			status: 400,
		});
	}
}
export async function POST(request, response) {
	const session = await getServerSession(authOptions);

	const formData = await request.formData();
	if (session) {
		try {
			const response = await createClub(formData, session?.accessToken);
			return new Response(JSON.stringify(response.data), { status: 200 });
		} catch (error) {
			return new Response(JSON.stringify(error.response.data), {
				status: 400,
			});
		}
	} else {
		return new Response(
			JSON.stringify({
				error: "You need to be logged in to create a club",
			}),
			{ status: 401 }
		);
	}
}

export const getClubs = async (query) => {
	return await axios.get(`${API_BASE_URL}clubs/`, {
		params: query,
	});
};

export const createClub = async (formData, token) => {
	return await axios.post(`${API_BASE_URL}clubs/`, formData, {
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "multipart/form-data",
		},
	});
};
