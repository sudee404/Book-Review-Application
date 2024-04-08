import axios from "axios";
import { API_BASE_URL } from "../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
	try {
		const query = request.nextUrl.searchParams;
		const response = await getReviews(query);
		return new Response(JSON.stringify(response.data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error.response.data), {
			status: 400,
		});
	}
}
export async function POST(request, response) {
	const session = await getServerSession(authOptions);

	const formData = await request.json();
	if (session) {
		try {
			const response = await addReview(formData, session?.accessToken);
			return new Response(JSON.stringify(response.data), { status: 200 });
		} catch (error) {
			return new Response(JSON.stringify(error.response.data), {
				status: 400,
			});
		}
	} else {
		return new Response(
			JSON.stringify({
				error: "You need to be logged in to leave a review",
			}),
			{ status: 401 }
		);
	}
}

export const getReviews = async (query) => {
	return await axios.get(`${API_BASE_URL}reviews/`, {
		params: query,
	});
};

export const addReview = async (formData, token) => {
	return await axios.post(`${API_BASE_URL}reviews/`, formData, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
};
